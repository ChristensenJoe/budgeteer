import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App';
import './index.css'
import store from './Redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
