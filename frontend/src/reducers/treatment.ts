import {
  GET_TREATMENT,
  TREATMENT_ERROR,
  DELETE_TREATMENT,
  GET_TREATMENTS,
} from '../actions/types';

const initialState = {
  treatment: null,
  treatments: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_TREATMENT:
      return {
        ...state,
        treatment: payload,
        loading: false,
      };
    case GET_TREATMENTS:
      return {
        ...state,
        treatments: payload,
        loading: false,
      };
    case TREATMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        treatment: null,
      };
    case DELETE_TREATMENT:
      return {
        ...state,
        treatment: null,
      };
    default:
      return state;
  }
}
