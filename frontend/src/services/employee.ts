import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Employees
export const getAllEmployees = async () => {
	const response = await fetch(baseurl + 'employee/getAll', {
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

//Get a employee @params - employeeId
export const getOneEmployee = async (id: number) => {
	const response = await fetch(baseurl + 'employee/getOne', {
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

//Add an employee
export const addEmployee = async (
	nic: string,
	name: string,
	email: string,
	address: string,
	designation: string,
	epfNo: number,
	contact: number,
	joinedDate: Date
) => {
	const response = await fetch(baseurl + 'employee/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			nic,
			name,
			email,
			address,
			designation,
			epfNo,
			contact,
			joinedDate,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an employee
export const editEmployee = async (
	id: number,
	isActive?: boolean,
	nic?: string,
	name?: string,
	email?: string,
	address?: string,
	designation?: string,
	epfNo?: number,
	contact?: number,
	joinedDate?: Date
) => {
	const response = await fetch(baseurl + 'employee/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			isActive,
			nic,
			name,
			email,
			address,
			designation,
			epfNo,
			contact,
			joinedDate,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete a employee @params - id
export const deleteEmployee = async (id: number) => {
	const response = await fetch(baseurl + 'employee/delete', {
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
