
import { session, toUpdate, updateInfo, checkSessions, resetPassword } from 'reducers';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

let rootReducer = combineReducers({
  session,
  updateInfo,
  checkSessions,
  resetPassword,
  routing: routerReducer,
  infoToUpdate: toUpdate,
  form: formReducer
});

export default function configureStore (history, initialState = {}) {

  const middlewares = [thunkMiddleware, routerMiddleware(history)]
  // if (process.env.NODE_ENV !== 'production') {
  //   middlewares.push(createLogger())
  // }

  const enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return createStore(rootReducer, initialState, enhancers)
}