import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import {
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
} from './types';

//Add / Update Employees
export const addEmployee = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/employee`, formData, config);

    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Employee Details Updated Successfully'
          : 'Employee Details Added Successfully',
        'success'
      )
    );

    if (!edit) {
      history.push(`/employee`);
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all employees
export const getEmployees = () => async (dispatch) => {
  dispatch({ type: DELETE_EMPLOYEE });

  try {
    const res = await axios.get(baseurl + 'api/employee');

    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Employee by ID
export const getEmployeeById = (empId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/employee/${empId}`);

    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete employee account
export const deleteEmployee = (empId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/employee/${empId}`);

      dispatch({ type: DELETE_EMPLOYEE });

      dispatch(setAlert('Your account has been permanently deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
