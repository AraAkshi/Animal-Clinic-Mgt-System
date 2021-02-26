import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts'
import animal from './animal';
import appointment from './appointment';
import customer from './customer';
import employee from './employee';
import inventory from './inventory';
import productCategory from './productCategory';
import treatment from './treatment';
import petTypes from './petTypes';

export default combineReducers({
	alerts,
	auth,
	animal,
	appointment,
	customer,
	employee,
	inventory,
	productCategory,
	treatment,
	petTypes
});
