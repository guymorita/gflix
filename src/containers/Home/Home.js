import React, { Component } from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { fetchMoviesIfNeeded } from '../../redux/actions/movies'
import MovieList from '../../components/MovieList/MovieList'

const DEFAULT_CATEGORY = 'ALL'

class Home extends Component {
  state = {
    selectedTab: 'redTab'
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMoviesIfNeeded(DEFAULT_CATEGORY))
  }

  _renderContent = (color: string, pageText: string, num?: number) => {
    const { movies, navigator } = this.props

    return(
      <View style={styles.container}>
        <View>
          <Text>
            Search Bar - Here
          </Text>
        </View>

        <View>
          {movies.length > 0 &&
            <MovieList movies={movies} navigator={navigator} />
          }
        </View>

        <View>
          <Text>
            Nav Bar
          </Text>
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
    backgroundColor: '#2A2544'
  }
})

function mapStateToProps(state) {
  const { moviesByCategory } = state
  const selectedCategory = DEFAULT_CATEGORY
  const {
    isFetching,
    lastUpdated,
    movies: movies
  } = moviesByCategory[selectedCategory] || {
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
