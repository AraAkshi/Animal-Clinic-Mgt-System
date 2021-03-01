import { baseurl } from '../utils/baseUrl';
import { token } from '../utils/token';

//Get All Items
export const getAllItems = async () => {
	const response = await fetch(baseurl + 'inventory/getAll', {
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

//Get a item @params - itemId
export const getOneItem = async (id: number) => {
	const response = await fetch(baseurl + 'inventory/getOne', {
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

//Get category items @params - category
export const getCategoryItems = async (category: any) => {
	const response = await fetch(baseurl + 'inventory/getCategoryItems', {
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
		const data = await response.text();
		return data;
	}
};

//Add an item
export const addItem = async (
	name: string,
	category: any,
	brand: string,
	unitPurchasePrice: number,
	bufferQty: number,
	quantity: number,
	unitSellingPrice: number,
	purchasedDate: Date,
	manufactureDate: Date,
	expireDate: Date,
	notifyBefore: number,
	batchNo: number
) => {
	const response = await fetch(baseurl + 'inventory/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			name,
			category,
			brand,
			unitPurchasePrice,
			bufferQty,
			quantity,
			unitSellingPrice,
			purchasedDate,
			manufactureDate,
			expireDate,
			notifyBefore,
			batchNo,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Edit an Item
export const editItem = async (
	id: number,
	isEmpty?: boolean,
	name?: string,
	category?: any,
	brand?: string,
	unitPurchasePrice?: number,
	bufferQty?: number,
	quantity?: number,
	unitSellingPrice?: number,
	purchasedDate?: Date,
	manufactureDate?: Date,
	expireDate?: Date,
	notifyBefore?: number,
	batchNo?: number
) => {
	const response = await fetch(baseurl + 'inventory/edit', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			isEmpty,
			name,
			category,
			brand,
			unitPurchasePrice,
			bufferQty,
			quantity,
			unitSellingPrice,
			purchasedDate,
			manufactureDate,
			expireDate,
			notifyBefore,
			batchNo,
			id,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Delete an Item @params - id
export const deleteItem = async (id: number) => {
	const response = await fetch(baseurl + 'inventory/delete', {
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
