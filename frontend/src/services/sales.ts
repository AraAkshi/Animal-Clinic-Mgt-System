import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Records
export const getAllRecords = async () => {
	const response = await fetch(baseurl + 'sales/getAll', {
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

//Get category Records @params - category
export const getCategoryRecords = async (category: any) => {
	const response = await fetch(baseurl + 'sales/getCategoryItems', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			category,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Add an Record
export const addRecord = async (
	name: string,
	category: any,
	soldQty: number,
	amount: number
) => {
	const response = await fetch(baseurl + 'sales/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			category,
			soldQty,
			amount,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an Record
export const editRecord = async (
	id: number,
	name?: string,
	category?: any,
	soldQty?: number,
	amount?: number,
	soldDate?: Date
) => {
	const response = await fetch(baseurl + 'sales/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			category,
			soldQty,
			amount,
			soldDate,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete an Record @params - id
export const deleteRecord = async (id: number) => {
	const response = await fetch(baseurl + 'sales/delete', {
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
