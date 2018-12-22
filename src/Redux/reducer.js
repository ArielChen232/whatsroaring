import { combineReducers } from 'redux'
import eventReducer from './eventReducer'
import calReducer from './calReducer'

const reducer = combineReducers({eventReducer, calReducer})
//const reducer = eventReducer

export default reducer;