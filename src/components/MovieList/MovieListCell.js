
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { viewDetails } from '../../redux/actions/details'
import config from '../../config/config'

class MovieListCell extends Component {
  state = {
    imgLoaded: false,
    imgUrl: ''
  }

  _onPressButton(movieId) {
    const { navigator, viewDetails } = this.props
    viewDetails(movieId)
    navigator.push({
      title: 'DetailsPage'
    })
  }

  componentDidMount() {
    const { movie } = this.props
    const { poster_path } = movie
    const imgSize = 'w500'
    const imgUrl = `${config.movieDbImgBaseUrl}${imgSize}${poster_path}`
    this.setState({
      imgUrl
    })

    const prefetchImg = Image.prefetch(imgUrl)
    prefetchImg.then(() =>{
      this.setState({
        imgLoaded: true
      })
    })
  }

  render() {
    const { movie } = this.props
    const { id, overview, title } = movie

    return (
      <TouchableOpacity onPress={this._onPressButton.bind(this, id)}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgBox}>
            {!this.state.imgLoaded &&
              <Image
                style={styles.loading}
                source={require('./gears.gif')}
              />
            }
            {this.state.imgLoaded &&
              <Image
                style={styles.thumbnail}
                source={{uri: this.state.imgUrl}}
                cache='reload'
              />
            }

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
  loading: {
    marginTop: 20,
    marginBottom: 10,
    height: 110,
    width: 110
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

export default connect(
  null,
  dispatch => bindActionCreators({ viewDetails }, dispatch
))(MovieListCell)
