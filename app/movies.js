import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import getMoviesFromApi from '../api/fetch_movies';

export default class gflix extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    movies: []
  }

  componentWillMount() {
    getMoviesFromApi().done((results) => {
      this.setState({movies: results});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            Search Bar
          </Text>
        </View>

        <View>
          <Text>
            Movie List
          </Text>
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
});
