import { combineReducers } from 'redux'
import eventReducer from './eventReducer'

const reducer = combineReducers({eventReducer})
//const reducer = eventReducer

export default reducer;