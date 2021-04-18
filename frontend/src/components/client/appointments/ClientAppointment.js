import {
	Grid,
	Chip,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	Button,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
	addAppointment,
	formatDate,
	getAllAppointments,
} from '../../../services/appointment';
import Navbar from '../layout/Navbar';
import { times } from '../../../services/datasets/appointment-times.d';
import Alerts from '../layout/Alerts';
import { getCustomerByEmail } from '../../../services/customer';
import { getCusAnimals } from '../../../services/animal';

function ClientAppointment() {
	const [alert, setAlert] = useState([]);
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTIme, setSelectedTIme] = useState('');
	const [remarks, setRemarks] = useState('');
	const [customer, setCustomer] = useState();
	const [animal, setAnimal] = useState();
	const [animals, setAnimals] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [availableTimes, setAvailableTimes] = useState([]);

	//Set selected date
	const handleDayClick = (day) => {
		setSelectedDate(day);
		getAvailTimes(day);
	};

	//Get Available Time Slots
	const getAvailTimes = (day) => {
		const dayAppointments = appointments.filter(
			(item) => formatDate(item.scheduleDate) === formatDate(day)
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
	};

	//Set Selected time slot
	const handleTimeSelect = (time) => {
		setSelectedTIme(time);
	};

	//Set selected values
	const onChange = (e) => {
		if (e.target.name === 'animal') setAnimal(e.target.value);
		if (e.target.name === 'remarks') setRemarks(e.target.value);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await getAllAppointments();
			if (res !== undefined) {
				setAppointments(res);
			}
			const customerRes = await getCustomerByEmail(localStorage.email);
			if (customerRes !== undefined) {
				setCustomer(customerRes);
				const animalRes = await getCusAnimals(customerRes.id);
				if (animalRes !== undefined) setAnimals(animalRes);
			}
		}
		fetchData();
	}, [0]);

	//Add appointment details
	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addAppointment(
			selectedDate,
			selectedTIme,
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
			window.open(window.location.origin + `/my-profile`, '_self');
		}
	};

	//Calender Stylings
	const past = {
		before: new Date(),
	};
	const modifiers = {
		selectedDay: selectedDate,
		disabled: past,
	};
	const modifiersStyles = {
		selectedDay: {
			color: 'white',
			backgroundColor: 'rgb(23, 147, 219)',
		},
	};

	return (
		<div>
			<Alerts alerts={alert} />
			<Navbar />
			<div className='bg-image'>
				<div className='container'>
					<div className='container-header'>ADD APPOINTMENT DETAILS</div>
					<Grid container direction='row' spacing='2'>
						<Grid item xs={4}>
							<div className='container-detail'>Contact Details:</div>
							<Grid
								container
								direction='column'
								spacing={1}
								style={{ padding: '0.5rem 1rem' }}
							>
								<TextField
									size='small'
									variant='outlined'
									label='Name'
									value={customer !== undefined ? customer.name : ''}
									disabled
								/>
								<TextField
									size='small'
									variant='outlined'
									label='Email'
									value={customer !== undefined ? customer.email : ''}
									style={{ marginTop: '1rem' }}
									disabled
								/>
								<TextField
									type='number'
									variant='outlined'
									size='small'
									label='Contact No'
									disabled
									value={customer !== undefined ? customer.contact : ''}
									style={{ marginTop: '1rem' }}
								/>
								{animals.length > 0 ? (
									<Fragment>
										<InputLabel
											id='animal'
											style={{ fontSize: '1vw', marginTop: '1rem' }}
										>
											Pet*
										</InputLabel>
										<Select
											labelId='animal'
											name='animal'
											value={animal}
											onChange={(e) => onChange(e)}
											required
										>
											{animals.map((item) => (
												<MenuItem key={item.id} value={item}>
													{`${item.breed} - ${item.name}`}
												</MenuItem>
											))}
										</Select>
									</Fragment>
								) : (
									<Fragment></Fragment>
								)}
								<TextField
									size='small'
									variant='outlined'
									name='remarks'
									label='Appointment Details'
									value={remarks.toUpperCase()}
									placeholder='Mention 1)Reason for Appointment and/or 2)Correct contact details if above is incorrect'
									onChange={(e) => onChange(e)}
									multiline
									rows={4}
									style={{ marginTop: '1rem', fontSize: '0.8vw' }}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<div className='container-detail'>Select Appointment Date:</div>
							<div className='calender'>
								<DayPicker
									onDayClick={handleDayClick}
									modifiers={modifiers}
									modifiersStyles={modifiersStyles}
								/>
							</div>
						</Grid>
						<Grid item xs={4} style={{ marginLeft: '1rem' }}>
							<div className='container-detail'>
								Select Available Time Slots:
							</div>
							<div style={{ height: '50vh' }}>
								<Grid container direction='row' justify='center' spacing={1}>
									{availableTimes.length > 0 ? (
										availableTimes.map((item) => (
											<Grid item xs={4}>
												<Chip
													style={{
														padding: '0.1rem',
														backgroundColor:
															item.time === selectedTIme
																? '#31af70'
																: '#05acd6',
														color: '#fff',
														marginBottom: '0.5rem',
													}}
													label={item.time}
													onClick={() => handleTimeSelect(item.time)}
												/>
											</Grid>
										))
									) : (
										<Chip
											style={{ padding: '0.5rem' }}
											label='No Available Time Slots'
											color='secondary'
										/>
									)}
								</Grid>
							</div>
							<Grid container justify='flex-end'>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onSubmit}
									style={{ minWidth: '10vw' }}
								>
									ADD APPOINTMENT
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default ClientAppointment;
