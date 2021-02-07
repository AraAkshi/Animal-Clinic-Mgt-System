import {
  GET_ANIMAL,
  ANIMAL_ERROR,
  DELETE_ANIMAL,
  GET_ANIMALS,
} from '../actions/types';

const initialState = {
  animal: null,
  animals: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANIMAL:
      return {
        ...state,
        animal: payload,
        loading: false,
      };
    case GET_ANIMALS:
      return {
        ...state,
        animals: payload,
        loading: false,
      };
    case ANIMAL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        animal: null,
      };
    case DELETE_ANIMAL:
      return {
        ...state,
        animal: null,
      };
    default:
      return state;
  }
}
