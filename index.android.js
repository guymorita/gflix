/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Movies from './app/movies';

export default class gflix extends Component {
  render() {
    return (
      <Movies />
    );
  }
}

AppRegistry.registerComponent('gflix', () => gflix);
