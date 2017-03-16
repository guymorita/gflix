
import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { movies } = props
    this.state = {
      dataSource: ds.cloneWithRows(movies),
    }
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(movie) =>
            <Text>{movie.title}</Text>
          }
        />
      </View>
    );
  }
}
