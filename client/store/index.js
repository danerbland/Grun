import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import business from './businesses'
import singleBusiness from './single-business'
import searchBarBusinesses from './search-bar-businesses'

const reducer = combineReducers({
  user,
  business,
  singleBusiness,
  searchBarBusinesses
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
