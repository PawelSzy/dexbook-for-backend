// ACTION TYPES (there may be more than one)
const LOAD_BOOKS = 'book/LOAD_BOOKS'
const WANT_TO_READ = 'book/WANT_TO_READ'

// ACTION CREATOR - in this file it is a THUNK
export const readLaterBook = (bookId) => {
  return { type: WANT_TO_READ, bookId }
}


// INITIAL VALUE
const initialState = {
    // List of books that user whant to read later.
    wantToRead: []
}

//REDUCER
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Number of cases should be equal to number of action types
    case WANT_TO_READ:
      return {
        ...state,
      wantToRead: state.wantToRead.concat([action.bookId])
      }
    default:
      return state
}
}
