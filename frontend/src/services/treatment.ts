import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Treatments
export const getAllTreatments = async () => {
	const response = await fetch(baseurl + 'treatment/getAll', {
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

//Get a Treatment @params - TreatmentId
export const getOneTreatment = async (id: number) => {
	const response = await fetch(baseurl + 'treatment/getOne', {
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

//Get Animal Treatments @params - Animal
export const getAnimalTreatments = async (animal: any) => {
	const response = await fetch(baseurl + 'treatment/getAnimalTreatments', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			animal,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.text();
		return data;
	}
};

//Get Customer Treatments @params - customer
export const getCustomerTreatments = async (customer: any) => {
	const response = await fetch(baseurl + 'treatment/getCustomerTreatments', {
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

//Add a Treatment
export const addTreatment = async (
	treatmentType: string,
	customer: any,
	animal: any,
	description: string,
	dateReceived: Date,
	timeReceived: Date,
	nextTreatmentDate: Date
) => {
	const response = await fetch(baseurl + 'treatment/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			treatmentType,
			customer,
			animal,
			description,
			dateReceived,
			timeReceived,
			nextTreatmentDate,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an Treatment
export const editTreatment = async (
	id: number,
	treatmentType?: string,
	customer?: any,
	animal?: any,
	description?: string,
	dateReceived?: Date,
	timeReceived?: Date,
	nextTreatmentDate?: Date
) => {
	const response = await fetch(baseurl + 'treatment/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			treatmentType,
			customer,
			animal,
			description,
			dateReceived,
			timeReceived,
			nextTreatmentDate,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete an Treatment @params - id
export const deleteTreatment = async (id: number) => {
	const response = await fetch(baseurl + 'treatment/delete', {
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
