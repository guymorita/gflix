
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import config from '../../config/config'

class Details extends Component {
  render() {
    console.log('rendering')
    const { details, moviesByCategory} = this.props
    const { currentMovieId } = details

    const selectedCategory = moviesByCategory.selectedCategory
    const moviesBySelction = moviesByCategory[selectedCategory]

    const moviesLoaded = moviesBySelction && moviesBySelction.movies && moviesBySelction.movies.length
    let movie = {}
    let imgUrl = 'http://www.google.com'

    if (moviesLoaded) {
      movie = moviesByCategory[selectedCategory].movies.find((value) => {
        return value.id === currentMovieId
      })

      if (movie) {
        const imgSize = 'w1000'
        const backdropPath = movie.backdrop_path
        imgUrl = `${config.movieDbImgBaseUrl}${imgSize}${backdropPath}`
      }
    }


    return (
      <View>
        {movie &&
          <View>
            <View>
              <Image source={{uri: imgUrl}} style={styles.imageBackground}>
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
          </View>
        }
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  imageBackground: {
    resizeMode: 'cover',
    height: height
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
