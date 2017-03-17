
import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  View
} from 'react-native'
import MovieListCell from './MovieListCell'

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { movies } = props
   
    this.state = {
      dataSource: ds.cloneWithRows(movies),
      ds: ds
    }
  }

  state = {
    filterText: ''
  }

  _filterMovies(movies, filterText) {
    const lowerSearchTerm = filterText.toLowerCase()

    return movies.filter((movie) => {
      const lowerTitle = movie.title.toLowerCase()
      const lowerOverview = movie.overview.toLowerCase()
      const containsTitle = lowerTitle.search(lowerSearchTerm) !== -1
      const containsOverview = lowerOverview.search(lowerSearchTerm) !== -1
      const containsSearchTerm = containsTitle || containsOverview
      const didSearch = lowerSearchTerm.length > 0

      return !didSearch || containsSearchTerm
    })
  }

  componentWillReceiveProps(nextProps) {
    const { filterText } = nextProps
    const filteredMovieList = this._filterMovies(nextProps.movies, nextProps.filterText)
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
            <MovieListCell movie={movie} navigator={navigator} />
          }
        />
      </View>
    );
  }
}
