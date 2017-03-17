
import {
  VIEW_DETAILS
} from '../actions/details'

const initialState = {
  currentMovieId: 0
}

export default function details(state = initialState, action) {
  console.log('reducing details', action, action && action.movieId)
  switch (action.type) {
    case VIEW_DETAILS:
      return Object.assign({}, state, {
        currentMovieId: action.movieId
      })
    default:
      return state
  }
}
