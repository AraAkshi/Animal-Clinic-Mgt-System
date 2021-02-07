import {
  GET_EMPLOYEE,
  EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
} from '../actions/types';

const initialState = {
  employee: null,
  employees: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: payload,
        loading: false,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
        loading: false,
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        employee: null,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employee: null,
      };
    default:
      return state;
  }
}
