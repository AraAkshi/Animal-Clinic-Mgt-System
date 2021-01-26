import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  CUSTOMER_ERROR,
  DELETE_CUSTOMER,
} from './types';

//Add Inquiry
export const addInquiry = (formData: any, history: string[]) => async (dispatch:any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/inquiries', formData, config);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert('Inquiry Details Added Successfully', 'success'));
    history.push(`/on-sale-vehicles`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: { msg: string; }) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Inquiries
export const getInquiries = () => async (dispatch:any) => {
  try {
    const res = await axios.get('/api/inquiries');

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

//Get selected Inquiry
export const getInquiryById = (customerId:string) => async (dispatch:any) => {
  try {
    const res = await axios.get(`/api/inquiries/${customerId}`);

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

//Delete Inquiry
export const deleteInquiry = (customerId:string, history: string[]) => async (dispatch:any) => {
  if (
    window.confirm('Do you want to Delete the Inquiry? This can NOT be undone!')
  ) {
    try {
      const res = await axios.delete(`/api/inquiries/${customerId}`);

      dispatch({ type: DELETE_CUSTOMER });
      history.push(`/dashboard`);
      dispatch(setAlert('Inquiry Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Update Inquiry
export const updateInquiry = (
  formData: any,
  customerId: string,
  history: string[]
) => async (dispatch:any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/inquiries/${customerId}`,
      formData,
      config
    );

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert('Inquiry Details Updated Successfully', 'success'));
    history.push(`/inquiries`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: { msg: string; }) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
