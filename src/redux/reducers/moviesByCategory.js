
import {
  REQUEST_MOVIES, RECEIVE_MOVIES
} from '../actions/movies'

const DEFAULT_CATEGORY = 'ALL'

const initialStateMovie = {
  isFetching: false,
  movies: [],
  page: 1
}

const initialStateCategory = {
  selectedCategory: DEFAULT_CATEGORY
}

function movies(state = initialStateMovie, action) {
  switch (action.type) {
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_MOVIES:
      const diffPages = state.page !== action.page
      const movies = diffPages ? state.movies.concat(action.movies) : action.movies
      return Object.assign({}, state, {
        isFetching: false,
        movies: movies,
        lastUpdated: action.receivedAt,
        page: action.page
      })
    default:
      return state
  }
}

export default function moviesByCategory(state = initialStateCategory, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        [action.category]: movies(state[action.category], action)
      })
    default:
      return state
  }
}
