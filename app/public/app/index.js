import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import { Router, hashHistory } from 'react-router'


import configureStore from './store'

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('root'))