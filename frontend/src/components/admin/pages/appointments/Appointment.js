import {
	Grid,
	Table,
	TableHead,
	TableCell,
	TableRow,
	Typography,
	Button,
	TableBody,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
	getAllAppointments,
	formatDate,
} from '../../../../services/appointment';

function Appointment() {
	const date = new Date();
	const [selectedDate, setSelectedDate] = useState(date);
	const [appointments, setAppointments] = useState([]);
	const [dayAppointments, setDayAppointments] = useState([]);

	const getAppoints = async (day) => {
		const dateString = formatDate(day);
		const dayAppoints = appointments.filter(
			(item) => item.scheduleDateTime.toLocaleDateString() == dateString
		);
		setDayAppointments(dayAppoints);
		console.log(dayAppoints);
	};

	useEffect(async () => {
		const res = await getAllAppointments();
		if (res !== undefined) setAppointments(res);
	}, [0]);

	const handleDayClick = (day) => {
		setSelectedDate(day);
		getAppoints(day);
	};

	const editAppointment = () => {};
	const deleteAppointment = () => {};

	return (
		<div>
			<Header />
			<Sidebar />
			<div className='sidebar-container'>
				<Grid container direction='row' spacing={1}>
					<Grid item xs={3}>
						<Grid container direction='column' spacing={2}>
							<Button
								size='small'
								color='secondary'
								startIcon={<AddIcon />}
								href='/admin/appointments/add-appointment'
								variant='contained'
								style={{ margin: '0.5rem' }}
							>
								New Appointment
							</Button>
							<br />
							<DayPicker onDayClick={handleDayClick} />
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<div className='appointmentCard'>
							<Typography variant='body2'>
								APPOINTMENTS ON {selectedDate.toLocaleDateString()}
							</Typography>
							<Table size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Time</TableCell>
										<TableCell>Title</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</Grid>
					<Grid item xs={5}>
						<Grid container direction='column'>
							<div className='appointmentCard'>
								<Typography variant='body2'>APPOINTMENTS DETAILS</Typography>
							</div>
							<Grid container direction='row' justify='flex-end'>
								<Button
									size='small'
									color='secondary'
									startIcon={<EditIcon />}
									onClick={editAppointment}
									variant='contained'
									style={{ margin: '0.5rem' }}
								>
									Edit
								</Button>
								<Button
									size='small'
									color='secondary'
									startIcon={<DeleteIcon />}
									onClick={deleteAppointment}
									variant='contained'
									style={{ margin: '0.5rem' }}
								>
									Delete
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* <AddAppointment setOpen={setOpen} open={open} /> */}
			</div>
		</div>
	);
}

export default Appointment;
