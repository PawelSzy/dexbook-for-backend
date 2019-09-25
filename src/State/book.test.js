import reducer from './book';
import * as actionTypes from './book'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      wantToRead: [],
      books: {},
      yourBooksRating: {},
      readedBooks: []
    });
  });

  it('Add book to read later', () => {
    expect(reducer(undefined, actionTypes.readLaterBook(1))).toEqual({
      wantToRead: [1],
      books: {},
      yourBooksRating: {},
      readedBooks: [],
    });
  });

  it('Delete book from read later', () => {
    expect(reducer({wantToRead: [1, 2]}, actionTypes.removeReadLaterBook(1) )).toEqual({
      wantToRead: [2],
    });
  });

  it('Add book to readed', () => {
    expect(reducer(undefined, actionTypes.addBookToReaded(1))).toEqual({
      wantToRead: [],
      books: {},
      yourBooksRating: {},
      readedBooks: [1],
    });
  });


  it('Rate books', () => {
    expect(reducer({
      wantToRead: [1],
      books: {
        "1" : {title: "Sandman", author: "Neil Gaiman", id: 1, price: "5$", people: 1000, score: 5000, rating: 5, image: "" },
      },
      yourBooksRating: {},
      },
      actionTypes.rateBook({rating: 5}, "1")
    ))
    .toEqual({
        wantToRead: [],
        books: {
          "1" : {title: "Sandman", author: "Neil Gaiman", id: 1, price: "5$", people: 1001, score: 5005, rating: 5, image: "" },
        },
        yourBooksRating: {
          "1": 5
        },
        readedBooks: [1]
    });
  });
});