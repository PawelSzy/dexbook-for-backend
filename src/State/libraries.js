// ACTION TYPES (there may be more than one)
const LOAD_LIBRARIES ='libraries/LOAD_LIBRARIES '

// ACTION CREATOR - in this file it is a THUNK
export const loadLibraries = () => {
  const libraries = [
    {
      id: 1,
      lat: 54.518468,
      lng: 18.542111,
      libraryName: "Vademecum"
    },
    {
      id: 2,
      lat: 54.524515,
      lng: 18.542914,
      libraryName: "Muza"
    },
    {
      id: 3,
      lat: 54.520517,
      lng: 18.543043,
      libraryName: "Świat książki"
    },
    {
      id: 4,
      lat: 54.512434,
      lng: 18.539534,
      libraryName: "Matras"
    },
  ]
  return { type: LOAD_LIBRARIES, libraries }
}

// INITIAL VALUE
const initialState = {
  // List of books that user whant to read later.
  libraries: [],
}

//REDUCER
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_LIBRARIES:
      return {
        ...state,
        libraries: [...state.libraries, ...action.libraries]
      }
    default:
      return state
  }
}