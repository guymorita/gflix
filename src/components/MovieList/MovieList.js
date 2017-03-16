
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class MovieList extends Component {
  render() {
    const { movies } = this.props

    return (
      <View>
        {movies.length > 0 && movies.map((movie, i) =>
          <View key={i}>
            <Text>
              {movie.title}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
