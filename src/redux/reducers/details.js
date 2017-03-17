
import {
  VIEW_DETAILS
} from '../actions/details'

const initialState = {
  currentMovieId: 0
}

export default function details(state = initialState, action) {
  switch (action.type) {
    case VIEW_DETAILS:
      return Object.assign({}, state, {
        currentMovieId: action.movieId
      })
    default:
      return state
  }
}
