import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
  GET_PRODUCTS,
} from '../actions/types';

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        product: null,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: null,
      };
    default:
      return state;
  }
}
