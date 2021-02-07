import axios from 'axios';
import { setAlert } from './alerts';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { baseurl } from '../utils/baseUrl';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(baseurl + '/api/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
export const userLogin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(baseurl + '/api/user', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
    console.log(dispatch.type);
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

//Register User
export const register = (
  role,
  email,
  password,
  name,
  address,
  contact
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    role,
    password,
    name,
    email,
    address,
    contact,
  });

  try {
    const res = await axios.post(baseurl + '/api/user/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Details Added Successfully', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
    console.log(dispatch.type);
  }
};
