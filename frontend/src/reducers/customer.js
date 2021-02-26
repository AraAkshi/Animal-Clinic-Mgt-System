import {
  GET_CUSTOMER,
  CUSTOMER_ERROR,
  DELETE_CUSTOMER,
  GET_CUSTOMERS,
} from '../actions/types';

const initialState = {
  customer: null,
  customers: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload,
        loading: false,
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false,
      };
    case CUSTOMER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        customer: null,
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customer: null,
      };
    default:
      return state;
  }
}
