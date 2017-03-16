
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'


const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export default class MovieListCell extends Component {
  _onPressButton() {
    const { navigator } = this.props
    navigator.push({title: 'DetailsPage'})
  }

  render() {
    const { movie } = this.props
    const { poster_path, overview, title } = movie
    const imgSize = 'w500'
    const imgUrl = `${IMAGE_BASE_URL}${imgSize}/${poster_path}`

    return (
      <TouchableOpacity onPress={this._onPressButton.bind(this)}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgBox}>
            <Image
              style={styles.thumbnail}
              source={{uri: imgUrl}}
            />
          </View>
          <View style={styles.descBox}>
            <Text style={[styles.baseText, styles.title]}>
              {title}
            </Text>
            <Text numberOfLines={6} style={styles.baseText}>
              {overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imgBox: {
    flex: 0.3,
    margin: 5
  },
  descBox: {
    flex: 0.7,
    margin: 5,
    paddingTop: 5
  },
  thumbnail: {
    margin: 5,
    height: 150
  },
  baseText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    marginBottom: 3
  }
})