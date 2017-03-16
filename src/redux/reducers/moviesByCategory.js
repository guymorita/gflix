
import { combineReducers } from 'redux'
import {
  REQUEST_MOVIES, RECEIVE_MOVIES
} from '../actions/movies'

function movies(state = {
  isFetching: false,
  movies: []
}, action) {
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

function moviesByCategory(state = { }, action) {
  console.log('reducing moviesByCategory action', action)
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

export default moviesByCategory
