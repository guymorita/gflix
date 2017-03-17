
export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'

import config from '../../config/config'

function requestMovies(category) {
  return {
    type: REQUEST_MOVIES,
    category
  }
}

function receiveMovies(category, json, nextPage) {
  return {
    type: RECEIVE_MOVIES,
    category,
    movies: json.results,
    receivedAt: Date.now(),
    page: nextPage
  }
}

function fetchMovies(state, category) {
  const movies = state.moviesByCategory[category]
  const page = movies && movies.page || 0
  const nextPage = page + 1

  return dispatch => {
    dispatch(requestMovies(category))
    return fetch(`${config.movieDbBaseUrl}discover/movie?primary_release_date.gte=2007-03-15&with_genres=878&page=${nextPage}&sort_by=popularity.desc&api_key=${config.movieDbApiKey}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMovies(category, json, nextPage)))
  }
}

function shouldFetchMovies(state, category) {
  const movies = state.moviesByCategory[category]
  return true
}

export function fetchMoviesIfNeeded(category) {
  return (dispatch, getState) => {
    const state = getState()
    if (shouldFetchMovies(state, category)) {
      return dispatch(fetchMovies(state, category))
    }
  }
}
