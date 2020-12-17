import axios from 'axios';
import { setAlert } from './alert';
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

//Load User
export const loadUser = () => async (dispatch: any) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/loginAuth');

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
export const clientLogin = (email: string, password: string) => async (
	dispatch: any
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/loginAuth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		//dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error: { msg: string }) =>
				dispatch(setAlert(error.msg, 'danger'))
			);
		}

		dispatch({
			type: LOGIN_FAIL,
		});
		console.log(dispatch.type);
	}
};

//Logout
export const logout = () => (dispatch: any) => {
	dispatch({ type: LOGOUT });
};

//Register User
export const register = (
	role: string,
	email: string,
	password: string
) => async (dispatch: any) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({
		role,
		email,
		password,
	});

	try {
		const res = await axios.post('/api/register-user', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error: { msg: string }) =>
				dispatch(setAlert(error.msg, 'danger'))
			);
		}

		dispatch({
			type: REGISTER_FAIL,
		});
		console.log(dispatch.type);
	}
};
