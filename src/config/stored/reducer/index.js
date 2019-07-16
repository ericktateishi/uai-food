import appReducer from './app/appReducer'
import cityReducer from './city/cityReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  app: appReducer,
  city: cityReducer
});