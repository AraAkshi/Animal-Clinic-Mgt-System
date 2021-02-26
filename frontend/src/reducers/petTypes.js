import {
  GET_ANIMALTYPE,
  ANIMALTYPE_ERROR,
  DELETE_ANIMALTYPE,
  GET_ANIMALTYPES,
} from '../actions/types';

const initialState = {
  animalType: null,
  animalTypes: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANIMALTYPE:
      return {
        ...state,
        animalType: payload,
        loading: false,
      };
    case GET_ANIMALTYPES:
      return {
        ...state,
        animalTypes: payload,
        loading: false,
      };
    case ANIMALTYPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        animalType: null,
      };
    case DELETE_ANIMALTYPE:
      return {
        ...state,
        animalType: null,
      };
    default:
      return state;
  }
}
