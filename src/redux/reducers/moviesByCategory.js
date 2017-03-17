
import {
  REQUEST_MOVIES, RECEIVE_MOVIES
} from '../actions/movies'

const DEFAULT_CATEGORY = 'ALL'

const initialStateMovie = {
  isFetching: false,
  movies: []
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
      return Object.assign({}, state, {
        isFetching: false,
        movies: action.movies,
        lastUpdated: action.receivedAt
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
