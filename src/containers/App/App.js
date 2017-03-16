import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { fetchMoviesIfNeeded } from '../../redux/actions/movies'
import MovieList from '../../components/MovieList/MovieList'

const DEFAULT_CATEGORY = 'ALL'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMoviesIfNeeded(DEFAULT_CATEGORY))
  }

  render() {
    const { movies } = this.props

    return (
      <View style={styles.container}>
        <View>
          <Text>
            Search Bar - Here
          </Text>
        </View>

        <View>
          {movies.length > 0 &&
            <MovieList movies={movies} />
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
}

const styles = StyleSheet.create({
  container: {
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

export default connect(mapStateToProps)(App)
