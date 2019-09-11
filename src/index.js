//import React from 'react';
//import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';
//
//import { Router, Route, IndexRoute } from 'react-router'
//import { Provider } from 'react-redux';
//import store from './store';
//
//ReactDOM.render(
//  <Provider store={store}>
//    <BrowserRouter>
//      <App />
//    </BrowserRouter>
//  </Provider>,
//  document.getElementById('root')
//
//);

//import React from 'react';
//import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { createStore, combineReducers } from 'redux';
//import * as serviceWorker from './serviceWorker';
//
//import './index.css';
//import App from './App';
//
//const rootReducer = combineReducers({
//});
//
//const store = createStore(rootReducer);
//
//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker.js';
import reducerTest from './State/reducerTest';

import './index.css';
import App from './App';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  test: reducerTest,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
