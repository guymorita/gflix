
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestMovies(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receiveMovies(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    movies: json.results,
    receivedAt: Date.now()
  }
}

function fetchMovies(category) {
  console.log('fetching movies')
  return dispatch => {
    dispatch(requestMovies(category))
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`)
      .then(response => response.json())
      .then(json => dispatch(receiveMovies(category, json)))
  }
}

function shouldFetchMovies(state, category) {
  const movies = state.moviesByCategory[category]
  if (!movies) {
    return true
  } else if (movies.isFetching) {
    return false
  }
}

export function fetchMoviesIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), category)) {
      return dispatch(fetchMovies(category))
    }
  }
}
