let ReactDOM = require('react-dom');
import 'babel-polyfill'
import React, { Component } from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes/routes'
import ResetPass from './components/ResetPass'
import configureStore from './store/configureStore'

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

//load foundation
$(document).foundation();

// load app css
require('style!css!sass!applicationStyles');

// store.subscribe(()=> {
//   let state = store.getState()
//   console.log(state);
// })
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
