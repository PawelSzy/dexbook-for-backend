// ACTION TYPES (there may be more than one)
const LOAD_LIBLARIES ='liblaries/LOAD_LIBLARIES '

// ACTION CREATOR - in this file it is a THUNK
export const loadLiblaries = () => {
  const liblaries = [
    {
      id: 1,
      lat: 54.518468,
      lng: 18.542111,
      liblaryName: "Vademecum"
    },
    {
      id: 2,
      lat: 54.524515,
      lng: 18.542914,
      liblaryName: "Muza"
    },
    {
      id: 3,
      lat: 54.520517,
      lng: 18.543043,
      liblaryName: "Świat książki"
    },
    {
      id: 4,
      lat: 54.512434,
      lng: 18.539534,
      liblaryName: "Matras"
    },
  ]
  return { type: LOAD_LIBLARIES, liblaries }
}

// INITIAL VALUE
const initialState = {
  // List of books that user whant to read later.
  liblaries: [],
}

//REDUCER
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_LIBLARIES:
      return {
        ...state,
        liblaries: [...state.liblaries, ...action.liblaries]
      }
  }
  return state
}