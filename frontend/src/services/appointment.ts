import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Appointment
export const getAllAppointments = async () => {
	const response = await fetch(baseurl + 'appointment/getAll', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Get an appointment @params - appointmentId
export const getOneAppointment = async (id: number) => {
	const response = await fetch(baseurl + 'appointment/getOne', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.text();
		return data;
	}
};

//Get Appointment of a customer @params - customer
export const getCusAppointment = async (customer: any) => {
	const response = await fetch(baseurl + 'appointment/getCustomerApp', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			customer,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.text();
		return data;
	}
};

//Add an appointment
export const addAppointment = async (
	scheduleDateTime: Date,
	remarks: string,
	animal: any,
	customer: any
) => {
	const response = await fetch(baseurl + 'appointment/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			remarks,
			scheduleDateTime,
			animal,
			customer,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an appointment
export const editAppointment = async (
	id: number,
	isAttended?: boolean,
	remarks?: string,
	scheduleDateTime?: Date,
	animal?: any,
	customer?: any
) => {
	const response = await fetch(baseurl + 'appointment/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			isAttended,
			remarks,
			scheduleDateTime,
			animal,
			customer,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete an appointment @params - id
export const deleteAppointment = async (id: number) => {
	const response = await fetch(baseurl + 'appointment/delete', {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		return 'success';
	}
};
