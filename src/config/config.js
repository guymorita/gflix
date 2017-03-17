
class config {
  constructor(props) {
    this.movieDbBaseUrl = 'https://api.themoviedb.org/3/'
    this.movieDbApiKey = 'a07e22bc18f5cb106bfe4cc1f83ad8ed'
    this.movieDbImgBaseUrl = 'https://image.tmdb.org/t/p/'
  }
}

module.exports = new config()
