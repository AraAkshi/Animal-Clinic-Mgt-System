import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import {
  GET_INVENTORY,
  GET_INVENTORYS,
  INVENTORY_ERROR,
  DELETE_INVENTORY,
} from './types';

//Add item to inventory
export const addInventory = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/inventory`, formData, config);

    dispatch({
      type: GET_INVENTORY,
      payload: res.data,
    });

    dispatch(setAlert('Inventory Details Added Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Inventory item
export const updateAnimal = (formData, history, itemId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/inventory/${itemId}`,
      formData,
      config
    );

    dispatch({
      type: GET_INVENTORY,
      payload: res.data,
    });

    dispatch(setAlert('Item Details Updated Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Inventory Items
export const getInventoryItems = () => async (dispatch) => {
  dispatch({ type: DELETE_INVENTORY });

  try {
    const res = await axios.get(baseurl + 'api/inventory');

    dispatch({
      type: GET_INVENTORYS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Inventory Item by ID
export const getInventoryItemById = (itemId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/inventory/${itemId}`);

    dispatch({
      type: GET_INVENTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Inventory Item
export const deleteInventoryItem = (itemId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/inventory/${itemId}`);

      dispatch({ type: DELETE_INVENTORY });

      dispatch(setAlert('Item details has been permanently deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: INVENTORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
