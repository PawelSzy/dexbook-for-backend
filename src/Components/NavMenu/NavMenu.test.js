import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

import NavMenu from './NavMenu';
import { NavLink } from 'react-router-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

configure({adapter: new Adapter()});

const composeEnhancers = compose;

const rootReducer = state => state;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

describe('<NavMenu />', () => {
  let wrapper;
  wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <NavMenu />
      </BrowserRouter>
    </Provider>
  );

  it('NavMenu should have links', () => {
    expect(wrapper.contains(NavLink)).toEqual(true);
  });
});