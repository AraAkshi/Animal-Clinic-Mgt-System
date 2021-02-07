import axios from 'axios';
import { setAlert } from './alerts';
import { baseurl } from '../utils/baseUrl';
import { GET_ANIMAL, GET_ANIMALS, ANIMAL_ERROR, DELETE_ANIMAL } from './types';

//Add Animal
export const addAnimal = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseurl + `/api/animal`, formData, config);

    dispatch({
      type: GET_ANIMAL,
      payload: res.data,
    });

    dispatch(setAlert('ANIMAL Details Added Successfully', 'success'));

    history.push(`/animal`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Animal
export const updateAnimal = (formData, history, animalId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      baseurl + `/api/animal/${animalId}`,
      formData,
      config
    );

    dispatch({
      type: GET_ANIMAL,
      payload: res.data,
    });

    dispatch(setAlert('ANIMAL Details Updated Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Animals
export const getAnimals = () => async (dispatch) => {
  dispatch({ type: DELETE_ANIMAL });

  try {
    const res = await axios.get(baseurl + 'api/animal');

    dispatch({
      type: GET_ANIMALS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get animal by ID
export const getAnimalById = (animalId) => async (dispatch) => {
  try {
    const res = await axios.get(baseurl + `api/animal/${animalId}`);

    dispatch({
      type: GET_ANIMAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete animal account
export const deleteAnimal = (animalId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(baseurl + `api/animal/${animalId}`);

      dispatch({ type: DELETE_ANIMAL });

      dispatch(
        setAlert('Animal details has been permanently deleted', 'danger')
      );
    } catch (err) {
      dispatch({
        type: ANIMAL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
