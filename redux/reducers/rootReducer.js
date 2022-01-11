import { combineReducers } from 'redux'

// Reducer
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer