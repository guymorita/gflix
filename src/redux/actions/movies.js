
export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'

function requestMovies(category) {
  return {
    type: REQUEST_MOVIES,
    category
  }
}

function receiveMovies(category, json) {
  return {
    type: RECEIVE_MOVIES,
    category,
    movies: json.results,
    receivedAt: Date.now()
  }
}

function fetchMovies(category) {
  return dispatch => {
    dispatch(requestMovies(category))
    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2007-03-15&with_genres=878&sort_by=popularity.desc&api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`)
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
