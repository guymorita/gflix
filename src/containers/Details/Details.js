
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import config from '../../config/config'

class Details extends Component {
  state = {
    movie: {},
    imgLoaded: false
  }

  _onPressButton() {
    const { navigator } = this.props
    navigator.pop()
  }

  componentWillMount() {
    const { details, moviesByCategory} = this.props
    const { currentMovieId } = details

    const selectedCategory = moviesByCategory.selectedCategory
    const moviesBySelction = moviesByCategory[selectedCategory]

    const moviesLoaded = moviesBySelction && moviesBySelction.movies && moviesBySelction.movies.length
    let movie = {}
    let imgUrl = 'http://www.stub.com/stub.jpg'

    if (moviesLoaded) {
      movie = moviesByCategory[selectedCategory].movies.find((value) => {
        return value.id === currentMovieId
      })

      if (movie) {
        const imgSize = 'w1000'
        const backdropPath = movie.backdrop_path
        imgUrl = `${config.movieDbImgBaseUrl}${imgSize}${backdropPath}`
        this.setState({
          imgUrl,
          movie
        })

        const prefetch = Image.prefetch(imgUrl)
        prefetch.then(() => {
          this.setState({
            imgLoaded: true
          })
        })
      }
    }
  }

  render() {
    const movie = this.state.movie


    const backArrowImg = require('./iconArrowLeft.png')

    return (
      <View style={styles.container}>
        {Object.keys(movie).length > 0 &&
          <View>
            <Image source={{uri: this.state.imgUrl}} style={styles.imageBackground}>
              <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                <Image
                  source={backArrowImg}
                  style={styles.backArrowImg}
                />
              </TouchableOpacity>
              <View style={styles.loadingBox}>
                {!this.state.imgLoaded &&
                  <Image
                    style={styles.loading}
                    source={require('../../components/MovieList/gears.gif')}
                  />
                }
              </View>
              <View style={styles.grayBox}>
                <Text style={[styles.baseText, styles.titleText]}>
                  {movie.title}
                </Text>
                <Text style={styles.baseText}>
                  {movie.overview}
                </Text>
              </View>
            </Image>
          </View>
        }
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2544'
  },
  imageBackground: {
    resizeMode: 'cover',
    height: height
  },
  backArrowImg: {
    height: 35,
    width: 35,
    margin: 15,
    opacity: 0.9
  },
  loadingBox: {
    alignItems: 'center',
    flex: 1
  },
  loading: {
    marginTop: 100,
    alignItems: 'center'
  },
  grayBox: {
    marginTop: height - 200,
    padding: 20,
    flex: 1,
    width: width,
    justifyContent: 'flex-end',
    backgroundColor: '#2A2544',
    opacity: 0.9
  },
  baseText: {
    padding: 15,
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 15
  },
  titleText: {
    fontSize: 24
  }
})

function mapStateToProps(state) {
  const { details, moviesByCategory } = state

  return {
    details,
    moviesByCategory
  }
}

export default connect(mapStateToProps)(Details)
