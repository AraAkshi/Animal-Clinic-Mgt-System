import {
  GET_APPOINTMENT,
  DELETE_APPOINTMENT,
  APPOINTMENT_ERROR,
  GET_APPOINTMENTS,
} from '../actions/types';

const initialState = {
  appointment: null,
  appointments: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };
    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointment: null,
        loading: false,
      };
    default:
      return state;
  }
}
