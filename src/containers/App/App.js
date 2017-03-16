import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { fetchMoviesIfNeeded } from '../../redux/actions/movies'

class App extends Component {
  constructor(props) {
    super(props)
    // console.log('app construct')
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log('component did mount')
    dispatch(fetchMoviesIfNeeded('all'))
  }

  render() {
    const { movies } = this.props
    console.log('movies', movies)

    return (
      <View style={styles.container}>
        <View>
          <Text>
            Search Bar - Here
          </Text>
        </View>

        <View>
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

// App.propTypes = {
//   selectedCategory: PropTypes.string.isRequired,
//   movies: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
  console.log('mapping state to props')
  const { selectedCategory, moviesByCategory } = state
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
