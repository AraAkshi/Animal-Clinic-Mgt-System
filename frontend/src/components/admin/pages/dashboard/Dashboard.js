import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { Grid } from '@material-ui/core';
import {
	formatDate,
	getAllAppointments,
} from '../../../../services/appointment';
import { getAllAnimals } from '../../../../services/animal';
import { getAllTreatments } from '../../../../services/treatment';
import { getAllItems } from '../../../../services/inventory';
import { getAllCustomers } from '../../../../services/customer';
import SalesChart from './SalesChart';
import { getAllRecords } from '../../../../services/sales';
import TreatmentChart from './TreatmentChart';
import AnimalChart from './AnimalChart';

function Dashboard() {
	const today = new Date();
	const [appointments, setAppointments] = useState([]);
	const [treatments, setTreatments] = useState([]);
	const [allTreatments, setAllTreatments] = useState([]);
	const [items, setItems] = useState([]);
	const [soldItems, setSoldItems] = useState([]);
	const [animals, setAnimals] = useState([]);
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			//Get All appointments and filter by today
			const appRes = await getAllAppointments();
			if (appRes !== undefined) {
				const todayApp = appRes.filter(
					(item) => formatDate(item.scheduleDate) === formatDate(today)
				);
				setAppointments(todayApp);
			}
			//Get All treatments and filter by today
			const treatRes = await getAllTreatments();
			if (treatRes !== undefined) {
				setAllTreatments(treatRes);
				const todayTreats = treatRes.filter(
					(item) => formatDate(item.dateReceived) === formatDate(today)
				);
				setTreatments(todayTreats);
			}
			//Get All items and filter by lowstock
			const itemRes = await getAllItems();
			if (itemRes !== undefined) {
				const lowStock = itemRes.filter(
					(item) => item.quantity === item.bufferQty
				);
				setItems(lowStock);
			}
			//Get All Animals
			const animalRes = await getAllAnimals();
			if (animalRes !== undefined) {
				setAnimals(animalRes);
			}
			//Get All Customers
			const cusRes = await getAllCustomers();
			if (cusRes !== undefined) {
				setCustomers(cusRes);
			}
			//Get All Sales
			const salesRes = await getAllRecords();
			if (salesRes !== undefined) {
				setSoldItems(salesRes);
			}
		}
		fetchData();
	}, [0]);

	//Redirect to clicked pages
	const handleClick = (link) => {
		window.open(window.location.origin + `/admin/${link}`, '_self');
	};

	return (
		<div>
			<Header />
			<Sidebar />
			<div className='sidebar-container' style={{ overflow: 'hidden' }}>
				<Grid
					container
					direction='row'
					justify='space-evenly'
					style={{ marginTop: '-0.5rem' }}
				>
					<Grid item xs={2}>
						<div
							className='dashboard-card'
							style={{ backgroundColor: '#f0a500' }}
							onClick={() => handleClick('appointments')}
						>
							APPOINTMENTS DUE
							<div className='dashboard-card-value'>{appointments.length}</div>
						</div>
					</Grid>
					<Grid item xs={2}>
						<div
							className='dashboard-card'
							style={{ backgroundColor: '#28527a' }}
							onClick={() => handleClick('treatments')}
						>
							TREATMENTS DONE
							<div className='dashboard-card-value'>{treatments.length}</div>
						</div>
					</Grid>
					<Grid item xs={2}>
						<div
							className='dashboard-card'
							style={{ backgroundColor: '#fb743e' }}
							onClick={() => handleClick('inventory')}
						>
							LOW STOCK ITEMS
							<div className='dashboard-card-value'>{items.length}</div>
						</div>
					</Grid>
					<Grid item xs={2}>
						<div
							className='dashboard-card'
							style={{ backgroundColor: '#af0069' }}
							onClick={() => handleClick('animals')}
						>
							TOTAL PETS
							<div className='dashboard-card-value'>{animals.length}</div>
						</div>
					</Grid>
					<Grid item xs={2}>
						<div
							className='dashboard-card'
							style={{ backgroundColor: '#5eaaa8' }}
							onClick={() => handleClick('customers')}
						>
							TOTAL CUSTOMERS
							<div className='dashboard-card-value'>{customers.length}</div>
						</div>
					</Grid>
				</Grid>
				<Grid container direction='row' justify='center'>
					<Grid item xs={12}>
						<SalesChart soldItems={soldItems} />
					</Grid>
				</Grid>
				<Grid container direction='row' justify='center' spacing={1}>
					<Grid item xs={9}>
						<TreatmentChart treatments={allTreatments} />
					</Grid>
					<Grid item xs={3}>
						<AnimalChart animals={animals} />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Dashboard;
