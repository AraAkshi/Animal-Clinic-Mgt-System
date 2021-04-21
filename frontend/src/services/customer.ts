import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Customer
export const getAllCustomers = async () => {
	const response = await fetch(baseurl + 'customer/getAll', {
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

//Get a Customer @params - customerId
export const getOneCustomer = async (id: number) => {
	const response = await fetch(baseurl + 'customer/getOne', {
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

//Get a Customer  @params - email
export const getCustomerByEmail = async (email: string) => {
	const response = await fetch(baseurl + 'customer/getOneByEmail', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			email,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Add an customer
export const addCustomer = async (
	name: string,
	email: string,
	address: string,
	contact: number,
	remarks: string,
) => {
	const response = await fetch(baseurl + 'customer/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			email,
			address,remarks,
			contact,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an customer
export const editCustomer = async (
	id: number,
	isActive?: boolean,
	name?: string,
	email?: string,
	address?: string,
	contact?: number,
	remarks?: string
) => {
	const response = await fetch(baseurl + 'customer/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			isActive,
			name,
			email,
			address,
			contact,
			remarks,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete a customer @params - id
export const deleteCustomer = async (id: number) => {
	const response = await fetch(baseurl + 'customer/delete', {
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
