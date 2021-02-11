import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';

import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  CUSTOMER_ERROR,
  DELETE_CUSTOMER,
} from './types';

//Add Customer
export const addCustomer = (name, email, address, contact) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const formData = JSON.stringify({
    name,
    email,
    address,
    contact,
  });
  console.log(formData);
  try {
    const res = await axios.post(baseurl + '/api/customer', formData, config);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert('Details Added Successfully', 'success'));
    // history.push(`/on-sale-vehicles`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Logged User Details
export const getMyAccount = () => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `/api/customer/me`);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Customers
export const getCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + '/api/customer');

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected customer
export const getCustomerById = (customerId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `/api/customer/${customerId}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Customer
export const deleteCustomer = (customerId, history) => async (dispatch) => {
  if (
    window.confirm(
      'Do you want to Delete your Account? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(baseurl + `/api/customer/${customerId}`);

      dispatch({ type: DELETE_CUSTOMER });
      // history.push(`/dashboard`);
      dispatch(setAlert('Account Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Update Customer
export const updateCustomer = (formData, customerId, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/customer/${customerId}`,
      formData,
      config
    );

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert('Details Updated Successfully', 'success'));
    // history.push(`/inquiries`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
