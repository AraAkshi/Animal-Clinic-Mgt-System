import {
  GET_INVENTORY,
  INVENTORY_ERROR,
  DELETE_INVENTORY,
  GET_INVENTORYS,
} from '../actions/types';

const initialState = {
  inventory: null,
  inventorys: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case GET_INVENTORY:
      return {
        ...state,
        inventory: payload,
        loading: false,
      };
    case GET_INVENTORYS:
      return {
        ...state,
        inventorys: payload,
        loading: false,
      };
    case INVENTORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        inventory: null,
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventory: null,
      };
    default:
      return state;
  }
}
