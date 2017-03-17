
import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import MovieListCell from './MovieListCell'
import { fetchMoviesIfNeeded } from '../../redux/actions/movies'

class MovieList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { movies, filterText, selectedTab } = props

    const filteredMovies = this._filterMovies(movies, filterText, selectedTab)
   
    this.state = {
      dataSource: ds.cloneWithRows(filteredMovies),
      ds: ds
    }
  }

  state = {
    filterText: ''
  }

  _onEndReached() {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchMoviesIfNeeded(selectedCategory))
  }

  _filterMovies(movies, filterText, selectedTab) {
    const lowerSearchTerm = filterText.toLowerCase()
    const filterNowPlaying = selectedTab && selectedTab === 'nowPlaying'

    return movies.filter((movie) => {
      const lowerTitle = movie.title.toLowerCase()
      const lowerOverview = movie.overview.toLowerCase()
      const containsTitle = lowerTitle.search(lowerSearchTerm) !== -1
      const containsOverview = lowerOverview.search(lowerSearchTerm) !== -1
      const containsSearchTerm = containsTitle || containsOverview
      const didSearch = lowerSearchTerm.length > 0

      const dateReleased = new Date(movie.release_date)
      const nowPlaying = dateReleased.getFullYear() >= 2017
      
      const hideNotPlaying = filterNowPlaying && !nowPlaying
      if (hideNotPlaying) {
        return false
      }

      return !didSearch || containsSearchTerm
    })
  }

  componentWillReceiveProps(nextProps) {
    const { filterText, movies, selectedTab } = nextProps
    const filteredMovieList = this._filterMovies(movies, filterText, selectedTab)
    this.setState({
      filterText,
      dataSource: this.state.ds.cloneWithRows(filteredMovieList)
    })
  }

  render() {
    const { navigator } = this.props

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(movie) =>
            <MovieListCell movie={movie} navigator={navigator}/>  
          }
          onEndReachedThreshold={100}
          onEndReached={() => {
            this._onEndReached()
          }}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { moviesByCategory } = state
  const selectedCategory = moviesByCategory.selectedCategory

  return {
    selectedCategory
  }
}

export default connect(mapStateToProps)(MovieList)
