import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
} from './types';

//Add Product Category
export const addProduct = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/product`, formData, config);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert('Product Details Added Successfully', 'success'));

    // history.push(`/product`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Product
export const updateProduct = (formData, history, productId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/product/${productId}`,
      formData,
      config
    );

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert('Product Details Updated Successfully', 'success'));

    // history.push(`/animal`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Products
export const getAnimals = () => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT });

  try {
    const res = await axios.get(baseurl + 'api/product');

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Product by ID
export const getProductById = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/product/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete product account
export const deleteProduct = (productId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/product/${productId}`);

      dispatch({ type: DELETE_PRODUCT });

      dispatch(
        setAlert('Product details has been permanently deleted', 'danger')
      );
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
