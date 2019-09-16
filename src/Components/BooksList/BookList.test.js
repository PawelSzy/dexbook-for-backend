import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BookList from './BookList.js';
import Book from './Book/Book.js';

configure({adapter: new Adapter()});

describe('<BookList />', () => {
  let wrapper;

  beforeEach(() => {
    const books = {
      "1" : {title: "Sandman", author: "Neil Gaiman", id: 1, price: "5$", people: 1000, score: 5000, rating: 5, image: "" },
      "2" : {title: "Dune", author: "Frank Herbert", id: 2, price: "6$", people: 1600, score: 8000, rating: 5, image: "" },
    }
    wrapper = shallow(<BookList books={books}/>);
  });

  it('should render two <Book/> elements', () => {
    expect(wrapper.find(Book)).toHaveLength(2);
  });
});