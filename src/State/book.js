import API from 'shared/api'

// ACTION TYPES (there may be more than one)
const LOAD_BOOKS = 'book/LOAD_BOOKS'
const WANT_TO_READ = 'book/WANT_TO_READ'
const LOAD_WANT_TO_READ_BOOKS_STORAGE = 'book/LOAD_WANT_TO_READ_BOOKS_STORAGE'
const REMOVE_WANT_TO_READ = 'book/REMOVE_WANT_TO_READ'
const RATE_BOOK = 'book/RATE_BOOK'
const RESET_WANT_TO_READ = 'book/RESET_WANT_TO_READ'
const LOAD_RATED_BOOKS_FROM_STORAGE = 'book/LOAD_RATED_BOOKS_FROM_STORAGE'
const RESET_RATED_BOOKS = 'book/RESET_RATED_BOOKS'
const ADD_BOOK_TO_READED = 'book/ADD_BOOK_TO_READED'
const REMOVE_BOOK_FROM_READED = 'book/REMOVE_BOOK_FROM_READED'
const GET_READED_BOOKS = 'book/GET_READED_BOOKS'
const RESET_READED_BOOK = 'book/RESET_READED_BOOK'
const FAILED_BOOK_LOAD = 'book/FAILED_BOOK_LOAD'

// ACTION CREATOR - in this file it is a THUNK
export const readLaterBook = (bookId) => {
  return { type: WANT_TO_READ, bookId }
}

export const removeReadLaterBook = (bookId) => {
  return { type: REMOVE_WANT_TO_READ, bookId }
}

export const addBookToReaded = (bookId) => {
  return { type: ADD_BOOK_TO_READED, bookId }
}

export const removeBookFromReaded = (bookId) => {
  return { type: REMOVE_BOOK_FROM_READED, bookId }
}

export const rateBook = (rating, bookId) => {
  return { type: RATE_BOOK, bookId, rating }
}

export const loadWantToReadBookFromStorage = () => {
  return { type: LOAD_WANT_TO_READ_BOOKS_STORAGE }
}

export const resetWantToReadBooks = () => {
  return { type: RESET_WANT_TO_READ }
}

export const getRatedBooks = () => {
  return { type: LOAD_RATED_BOOKS_FROM_STORAGE }
}

export const getReadedBooks = (id) => dispatch => {
  API.get(`users/${id}/readeds.jsonld`)
    .then(response => response.data)
    .then(data => {
      const readedBooks = data["hydra:member"].map(book => book.id);
      dispatch({ type: GET_READED_BOOKS, readedBooks });
    })
}

export const resetReadedBooks = () => {
  return { type: RESET_READED_BOOK }
}

export const resetRatedBooks = () => {
  return { type: RESET_RATED_BOOKS }
}

export const loadBooks = () => dispatch => {
  API.get(`books.jsonld`)
    .then(res => res.data)
    .then(data => {
      if (data['hydra:member']) {
        return data['hydra:member'];
      }
      return [];
    })
    .then(books => books.map(book => {
      if(typeof book.image != 'undefined') {
        // @TODO fix it in php side
        book.image = book.image.replace(/=>/g, ':').replace(/'/g, "").replace(/'/g, "");
      }
      return book;
    }))
    .then(books => books.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {}))
    .then(books => dispatch({type: LOAD_BOOKS, books}))
    .catch(
      error => dispatch({
        type: FAILED_BOOK_LOAD,
        error: error.message
      })
    );
}

// INITIAL VALUE
const initialState = {
    // List of books that user whant to read later.
    wantToRead: [],
    books: {},
    yourBooksRating: {},
    readedBooks: []
}

const updateOverallBookRating = (book, rating) => {
  book["people"] += 1
  book["score"] += rating
  book["rating"] = book["score"] / book["people"]
  return book
}

const updateBookRatingRatedByYou = (book, rating, yourBooksRating) => {
  const oldRating = yourBooksRating[book.id]
  book['score'] = book['score'] - oldRating + rating
  book["rating"] = book["score"] / book["people"]
  return book;
}

const addWantToReadBookToStorage = (bookId) => {
  const storageReadLaterBooks = localStorage.getItem('wantToRead') ? JSON.parse(localStorage.getItem('wantToRead')) : []
  if (!(storageReadLaterBooks.includes(bookId))) {
    localStorage.setItem('wantToRead', JSON.stringify([...storageReadLaterBooks, ...[bookId]]));
  }
}

const removeReadLaterBookFromStorage = (bookId) => {
  const storageReadLaterBooks = localStorage.getItem('wantToRead') ? JSON.parse(localStorage.getItem('wantToRead')) : []
  localStorage.setItem('wantToRead', JSON.stringify(storageReadLaterBooks.filter(id => id !== bookId)))
}

const getReadLaterBooksFromStorage = () => {
  return localStorage.getItem('wantToRead') ? JSON.parse(localStorage.getItem('wantToRead')) : []
}

const addRatedBooksToStorage = (bookId, rating) => {
  let storageRatedBooks = localStorage.getItem('ratedBooks') ? JSON.parse(localStorage.getItem('ratedBooks')) : {}
  storageRatedBooks[Number(bookId)] = rating
  localStorage.setItem('ratedBooks', JSON.stringify(storageRatedBooks));
}

const removeRatedBooksFromStorage = (bookId) => {
  let storageRatedBooks = localStorage.getItem('ratedBooks') ? JSON.parse(localStorage.getItem('ratedBooks')) : {}
  delete storageRatedBooks['bookId']
  localStorage.setItem('ratedBooks', JSON.stringify(storageRatedBooks));
}

export const getRatedBooksFromStorage = () => {
  return localStorage.getItem('ratedBooks') ? JSON.parse(localStorage.getItem('ratedBooks')) : {}
}

const addReadedBookToStorage = bookId => {
  const storagerReadedBooks = localStorage.getItem('readedBooks') ? JSON.parse(localStorage.getItem('readedBooks')) : []
  if (!(storagerReadedBooks.includes(bookId))) {
    localStorage.setItem('readedBooks', JSON.stringify([...storagerReadedBooks, ...[bookId]]));
  }
}

const deleteReadedBookFromStorage = (bookId) => {
  const storageReadedBooks = localStorage.getItem('readedBooks') ? JSON.parse(localStorage.getItem('readedBooks')) : []
  localStorage.setItem('readedBooks', JSON.stringify(storageReadedBooks.filter(id => id !== bookId)))
}

const getReadedBooksFromStorage = () => {
  return localStorage.getItem('readedBooks') ? JSON.parse(localStorage.getItem('readedBooks')).map(bookId => Number(bookId)) : []
}

//REDUCER
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Number of cases should be equal to number of action types
    case WANT_TO_READ:
      if (state.wantToRead.includes(Number(action.bookId))) {
        return state;
      }
      addWantToReadBookToStorage(action.bookId)
      return {
        ...state,
      wantToRead: state.wantToRead.concat( [Number(action.bookId)] )
      }
    case REMOVE_WANT_TO_READ:
      removeReadLaterBookFromStorage(action.bookId)
      return {
        ...state,
        wantToRead: state.wantToRead.filter(bookId => Number(bookId) !== Number(action.bookId))
      }
    case RESET_WANT_TO_READ:
      return {
        ...state,
        wantToRead: []
      }
    case LOAD_BOOKS:
      return {
        ...state,
        books: {...state.books, ...action.books}
      }
    case LOAD_WANT_TO_READ_BOOKS_STORAGE:
      const readLater = getReadLaterBooksFromStorage().map(number => Number(number))
      const toRead = state.wantToRead ? state.wantToRead : []
      let setWantToread = new Set( [ ...toRead, ...readLater])
      return {
        ...state,
        wantToRead: [...setWantToread]
      }
    case LOAD_RATED_BOOKS_FROM_STORAGE:
      const yourBooksRating = getRatedBooksFromStorage()
      return {
        ...state,
        yourBooksRating: {...yourBooksRating, ...state.yourBooksRating }
      }
    case ADD_BOOK_TO_READED:
      addReadedBookToStorage(Number(action.bookId))
      return {
        ...state,
        readedBooks:  [...(new Set(state.readedBooks)).add(Number(action.bookId))],
      }
    case REMOVE_BOOK_FROM_READED:
      deleteReadedBookFromStorage(action.bookId)
      return {
        ...state,
        readedBooks: state.readedBooks.filter(bookId => Number(bookId) !== Number(action.bookId))
      }
    case GET_READED_BOOKS:
      const readedBooks = action.readedBooks
      return {
        ...state,
        readedBooks: [...readedBooks, ...state.readedBooks ]
      }
    case RATE_BOOK:
      let newBooksRating = {...state.yourBooksRating}
      const rating = action.rating.rating
      newBooksRating[action.bookId] = rating

      let newBooks = {...state.books}

      const wasBookRatedByYou = action.bookId in state.yourBooksRating
      if (wasBookRatedByYou) {
        newBooks[action.bookId] = updateBookRatingRatedByYou(Object.assign({}, newBooks[action.bookId]), rating, state.yourBooksRating)
      } else {
        newBooks[action.bookId] = updateOverallBookRating(Object.assign({}, newBooks[action.bookId]), rating)
      }
      addReadedBookToStorage(action.bookId)
      addRatedBooksToStorage(action.bookId, rating)
      removeReadLaterBookFromStorage(Number(action.bookId))
      return {
        ...state,
        books: {...state.books, ...newBooks},
        yourBooksRating: newBooksRating,
        readedBooks:  [...(new Set(state.readedBooks)).add(Number(action.bookId))],
        wantToRead: state.wantToRead.filter(bookId => Number(bookId) !== Number(action.bookId))
      }
    case RESET_RATED_BOOKS:
      return {
        ...state,
        yourBooksRating: {}
      }
    case RESET_READED_BOOK:
      return {
        ...state,
        readedBooks: [],
      }
    case FAILED_BOOK_LOAD:
      console.error(action.error);
      return {
        ...state,
        books: {}
      }
    default:
      return state
  }
}
