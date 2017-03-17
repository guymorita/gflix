
import React, { Component } from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  TextInput,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { fetchMoviesIfNeeded } from '../../redux/actions/movies'
import MovieList from '../../components/MovieList/MovieList'

class Home extends Component {
  state = {
    selectedTab: 'redTab',
    filterText: ''
  }

  _filterTextChange(filterText) {
    this.setState({
      filterText
    })
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchMoviesIfNeeded(selectedCategory))
  }

  _renderContent = (color: string, pageText: string, num?: number) => {
    const { movies, navigator } = this.props

    return(
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(filterText) => this._filterTextChange(filterText)}
            placeholder='Search here...'
            value={this.state.filterText}
          />
        </View>

        <View>
          {movies.length > 0 &&
            <MovieList movies={movies} navigator={navigator} filterText={this.state.filterText} />
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          systemIcon="most-viewed"
          title="Top Ranking"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="top-rated"
          badgeColor="black"
          selected={this.state.selectedTab === 'redTab'}
          title="Now Playing"
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2544',
    flex: 1
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    color: 'purple',
    opacity: 0.9,
    borderRadius: 5,
    margin: 4
  }
})

function mapStateToProps(state) {
  const { moviesByCategory } = state
  const selectedCategory = moviesByCategory.selectedCategory
  const {
    isFetching,
    lastUpdated,
    movies: movies
  } = moviesByCategory[moviesByCategory.selectedCategory] || {
    isFetching: true,
    movies: []
  }

  return {
    selectedCategory,
    movies,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Home)
