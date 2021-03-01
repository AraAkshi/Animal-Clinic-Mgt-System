import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Animals
export const getAllAnimals = async () => {
	const response = await fetch(baseurl + 'animal/getAll', {
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

//Get an Animal @params - animalId
export const getOneAnimal = async (id: number) => {
	const response = await fetch(baseurl + 'animal/getOne', {
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

//Get animals of a customer @params - customer
export const getCusAnimals = async (customer: any) => {
	const response = await fetch(baseurl + 'animal/getCusAnimals', {
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

//Add an animal
export const addAnimal = async (
	name: string,
	gender: string,
	bloodGroup: string,
	dateOfBirth: Date,
	remarks: string,
	breed: string,
	type: any,
	owner: any
) => {
	console.log(name);
	const response = await fetch(baseurl + 'animal/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			gender,
			bloodGroup,
			dateOfBirth,
			remarks,
			breed,
			type,
			owner,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an animal
export const editAnimal = async (
	id: number,
	isActive?: boolean,
	name?: string,
	gender?: string,
	bloodGroup?: string,
	dateOfBirth?: Date,
	remarks?: string,
	breed?: string,
	type?: any,
	owner?: any
) => {
	console.log(
		name,
		isActive,
		gender,
		bloodGroup,
		dateOfBirth,
		remarks,
		breed,
		type,
		owner,
		id
	);
	const response = await fetch(baseurl + 'animal/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			isActive,
			gender,
			bloodGroup,
			dateOfBirth,
			remarks,
			breed,
			type,
			owner,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete an Animal @params - id
export const deleteAnimal = async (id: number) => {
	const response = await fetch(baseurl + 'animal/delete', {
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
