import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//User login and getting token
export const login = async (email: string, password: string) => {
	const response = await fetch(baseurl + 'auth/login', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data: {
			name: string;
			userrole: string;
			accessToken: string;
		} = await response.json();
		localStorage.setItem('token', data.accessToken);
		localStorage.setItem('userRole', data.userrole);
		localStorage.setItem('username', data.name);
		localStorage.setItem('email', email);
		return data;
	}
};

//Add User
export const addUser = async (
	email: string,
	password: string,
	role: string,
	name: string
) => {
	const response = await fetch(baseurl + 'auth/register', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			email,
			password,
			role,
			name,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	} else {
		// return response.response.message;
	}
};

//Edit User
export const editUser = async (email: string, role: string, name: string) => {
	const response = await fetch(baseurl + 'auth/editUser', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			email,
			role,
			name,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	} else {
		// return response.response.message;
	}
};

//Get All Users
export const getAllUser = async () => {
	const response = await fetch(baseurl + 'auth/getUsers', {
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

//Logout User
export const logout = () => {
	localStorage.clear();
	window.open('/', '_self');
};
