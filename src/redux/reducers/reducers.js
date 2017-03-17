
import { combineReducers } from 'redux'

import details from './details'
import moviesByCategory from './moviesByCategory'

export default combineReducers({
  details,
  moviesByCategory
});
