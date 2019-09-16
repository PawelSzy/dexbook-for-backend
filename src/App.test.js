import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker.js';
import reducerBook from './State/book';

import './index.css';

const composeEnhancers = compose;

const rootReducer = combineReducers({
  book: reducerBook,
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
