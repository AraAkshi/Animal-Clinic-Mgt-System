import {
	Backdrop,
	Modal,
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getCusAnimals } from '../../../../services/animal';
import { getAllCustomers } from '../../../../services/customer';
import Alerts from '../../../client/layout/Alerts';
import Appointment from './Appointment';
import {
	addAppointment,
	formatDate,
	getAllAppointments,
} from '../../../../services/appointment';
import { times } from '../../../../services/datasets/appointment-times.d';
import _ from 'lodash';

const AddAppointment = () => {
	const d = new Date();
	const date = formatDate(d);
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [animals, setAnimals] = useState([]);
	const [formData, setFormData] = useState({
		customer: '',
		scheduleDate: date,
		scheduleTime: '',
		animal: null,
		remarks: '',
	});
	const [availableTimes, setAvailableTimes] = useState([]);

	const { customer, scheduleDate, scheduleTime, animal, remarks } = formData;

	const onChange = async (e) => {
		if (e.target.name.toString() === 'customer') {
			const animalRes = await getCusAnimals(e.target.value.id);
			if (animalRes !== undefined) setAnimals(animalRes);
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });

		if (e.target.name === 'scheduleDate') {
			const dayAppointments = appointments.filter(
				(item) => formatDate(item.scheduleDate) === formatDate(e.target.value)
			);
			const notAvailTImes = [];
			for (let i = 0; i < dayAppointments.length; i++) {
				const time = times.find(
					(item) => item.time === dayAppointments[i].scheduleTime
				);
				notAvailTImes.push(time);
			}
			const availTimes = _.difference(times, notAvailTImes);
			setAvailableTimes(availTimes);
		}
	};

	//reset form
	const resetForm = () => {
		setFormData({
			customer: '',
			scheduleDate: date,
			scheduleTime: '',
			animal: null,
			remarks: '',
		});
	};

	useEffect(() => {
		async function fetchData() {
			const appointRes = await getAllAppointments();
			if (appointRes !== undefined) setAppointments(appointRes);

			const customerRes = await getAllCustomers();
			if (customerRes !== undefined) setCustomers(customerRes);
		}
		fetchData();
	}, [0]);

	//Add Appointment Details
	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addAppointment(
			scheduleDate,
			scheduleTime,
			remarks,
			animal,
			customer
		);
		if (res !== undefined) {
			const newAlert = [
				{
					msg: 'Appointment Details Added Successfully',
					alertType: 'success',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/admin/appointments`, '_self');
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
		window.open(window.location.origin + `/admin/appointments`, '_self');
	};

	return (
		<div>
			<Alerts alerts={alert} />
			<Appointment />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<div className='addModal'>
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<Grid
							container
							direction='column'
							spacing={1}
							style={{ padding: '1rem' }}
						>
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<InputLabel id='customer' style={{ fontSize: '1vw' }}>
										Customer*
									</InputLabel>
									<Select
										labelId='customer'
										name='customer'
										value={customer}
										onChange={(e) => onChange(e)}
										required
									>
										{customers.length > 0 ? (
											customers.map((item) => (
												<MenuItem key={item.id} value={item}>
													{item.name}
												</MenuItem>
											))
										) : (
											<MenuItem>None Available</MenuItem>
										)}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<InputLabel id='animal' style={{ fontSize: '1vw' }}>
										Animal*
									</InputLabel>
									<Select
										labelId='animal'
										name='animal'
										value={animal}
										onChange={(e) => onChange(e)}
										required
									>
										{animals.length > 0 ? (
											animals.map((item) => (
												<MenuItem key={item.id} value={item}>
													{`${item.breed} - ${item.name}`}
												</MenuItem>
											))
										) : (
											<MenuItem>None Available</MenuItem>
										)}
									</Select>
								</Grid>
							</Grid>
							<TextField
								size='small'
								variant='outlined'
								value={customer.email}
								style={{ marginTop: '0.5rem' }}
								disabled
							/>
							<TextField
								type='number'
								variant='outlined'
								size='small'
								value={customer.contact}
								style={{ marginTop: '0.5rem' }}
								disabled
							/>
							<Grid
								container
								direction='row'
								style={{ marginTop: '0.5rem' }}
								spacing={2}
							>
								<Grid item xs={6}>
									<TextField
										type='date'
										size='small'
										name='scheduleDate'
										label='Appointment Date'
										value={scheduleDate}
										inputProps={{
											min: `${new Date().toISOString().split('T')[0]}`,
										}}
										onChange={(e) => onChange(e)}
										required
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel id='scheduleTime' style={{ fontSize: '1vw' }}>
										Appointment Time*
									</InputLabel>
									<Select
										labelId='scheduleTime'
										name='scheduleTime'
										value={scheduleTime}
										onChange={(e) => onChange(e)}
										required
									>
										{availableTimes.length > 0 ? (
											availableTimes.map((item) => (
												<MenuItem key={item.id} value={item.time}>
													{item.time}
												</MenuItem>
											))
										) : (
											<MenuItem>None Available</MenuItem>
										)}
									</Select>
								</Grid>
							</Grid>
							<TextField
								size='small'
								name='remarks'
								label='Additional Remarks'
								value={remarks.toUpperCase()}
								onChange={(e) => onChange(e)}
								multiline
								rows={2}
								style={{ marginTop: '0.5rem' }}
							/>
						</Grid>
						<Grid
							container
							direction='row'
							spacing={3}
							justify='center'
							style={{ padding: '1rem' }}
						>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={resetForm}
								>
									RESET
								</Button>
							</Grid>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onSubmit}
								>
									CONFIRM
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default AddAppointment;
