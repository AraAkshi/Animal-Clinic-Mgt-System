import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import {
  GET_ANIMALTYPE,
  GET_ANIMALTYPES,
  ANIMALTYPE_ERROR,
  DELETE_ANIMALTYPE,
} from './types';

//Add ANIMAL TYPE
export const addAnimalType = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/animalType`, formData, config);

    dispatch({
      type: GET_ANIMALTYPE,
      payload: res.data,
    });

    dispatch(setAlert('Animal Type Details Added Successfully', 'success'));

    // history.push(`/ANIMALTYPE`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ANIMALTYPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Animal Type
export const updateAnimalType = (formData, history, animalTypeId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/animalType/${animalTypeId}`,
      formData,
      config
    );

    dispatch({
      type: GET_ANIMALTYPE,
      payload: res.data,
    });

    dispatch(setAlert('Animal Type Details Updated Successfully', 'success'));

    // history.push(`/animal`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ANIMALTYPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Animal Types
export const getAnimalTypes = () => async (dispatch) => {
  dispatch({ type: DELETE_ANIMALTYPE });

  try {
    const res = await axios.get(baseurl + 'api/animalType');

    dispatch({
      type: GET_ANIMALTYPES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANIMALTYPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get animalType by ID
export const getAnimalTypeById = (animalTypeId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/animalType/${animalTypeId}`);

    dispatch({
      type: GET_ANIMALTYPE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANIMALTYPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Animal Type account
export const deletAnimalType = (animalTypeId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/ANIMALTYPE/${animalTypeId}`);

      dispatch({ type: DELETE_ANIMALTYPE });

      dispatch(
        setAlert('Animal Type details has been permanently deleted', 'danger')
      );
    } catch (err) {
      dispatch({
        type: ANIMALTYPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
