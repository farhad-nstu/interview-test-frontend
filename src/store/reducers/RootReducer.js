import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import NewsReducer from './NewsReducer'
import CategoryReducer from './CategoryReducer'

const RootReducer = combineReducers({
  auth: AuthReducer,
  news: NewsReducer,
  category: CategoryReducer
})

export default RootReducer