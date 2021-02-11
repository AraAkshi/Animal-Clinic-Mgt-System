import axios from 'axios';
import { setAlert } from './alerts';

import {
	GET_APPOINTMENT,
	GET_APPOINTMENTS,
	APPOINTMENT_ERROR,
	DELETE_APPOINTMENT,
} from './types';

//Add Appointments
export const addAppointment = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/appointment`, formData, config);

		dispatch({
			type: GET_APPOINTMENT,
			payload: res.data,
		});

		dispatch(setAlert('Appointment Details Added Successfully', 'success'));

		// history.push(`/`);
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Get Logged User Appointments
export const getAppointmentByLoggedUserId = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/my-appointments`);

		dispatch({
			type: GET_APPOINTMENTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Get A User's Appointments
export const getAppointmentByUserId = (client_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/${client_id}`);

		dispatch({
			type: GET_APPOINTMENTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Get All Appointments
export const getAppointments = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/appointment');

		dispatch({
			type: GET_APPOINTMENTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Get selected Appointment
export const getAppointmentById = (appointment_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/${appointment_id}`);

		dispatch({
			type: GET_APPOINTMENT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Delete Appointment
export const deleteAppointment = (appointment_id) => async (dispatch) => {
	if (
		window.confirm(
			'Do you want to Delete the Appointment? This can NOT be undone!'
		)
	) {
		try {
			const res = await axios.delete(`/api/appointment/${appointment_id}`);

			dispatch({ type: DELETE_APPOINTMENT });
			dispatch(setAlert('Appointment Deleted', 'danger'));
		} catch (err) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	}
};

//Update Appointment
export const updateAppointment = (formData, appointment_id, history) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			`/api/appointment/${appointment_id}`,
			formData,
			config
		);

		dispatch({
			type: GET_APPOINTMENT,
			payload: res.data,
		});

		dispatch(setAlert('Appointment Details Updated Successfully', 'success'));

		history.push(`/appointments`);
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: APPOINTMENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const formatDate = (date) => {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};
