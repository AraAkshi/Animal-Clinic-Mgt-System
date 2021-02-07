import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import {
  GET_TREATMENT,
  GET_TREATMENTS,
  TREATMENT_ERROR,
  DELETE_TREATMENT,
} from './types';

//Add Treatment
export const addTreatment = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/treatment`, formData, config);

    dispatch({
      type: GET_TREATMENT,
      payload: res.data,
    });

    dispatch(setAlert('Treatment Details Added Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TREATMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Animal
export const updateTreatment = (formData, history, treatmentId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/treatment/${treatmentId}`,
      formData,
      config
    );

    dispatch({
      type: GET_TREATMENT,
      payload: res.data,
    });

    dispatch(setAlert('Treatment Details Updated Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TREATMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Treatments
export const getTreatments = () => async (dispatch) => {
  dispatch({ type: DELETE_TREATMENT });

  try {
    const res = await axios.get(baseurl + 'api/treatment');

    dispatch({
      type: GET_TREATMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TREATMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Treatment by ID
export const getTreatmentById = (treatmentId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/treatment/${treatmentId}`);

    dispatch({
      type: GET_TREATMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TREATMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete treatment account
export const deleteTreatment = (treatmentId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/treatment/${treatmentId}`);

      dispatch({ type: DELETE_TREATMENT });

      dispatch(
        setAlert('Treatment details has been permanently deleted', 'danger')
      );
    } catch (err) {
      dispatch({
        type: TREATMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
