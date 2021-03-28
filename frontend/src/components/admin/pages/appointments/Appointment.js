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
import { withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Header from '../../layout/Header';
import Alerts from '../../../layout/Alerts';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import {
	getAllAppointments,
	formatDate,
} from '../../../../services/appointment';
import AppointmentDetail from './AppointmentDetail';
import { getAllCustomers } from '../../../../services/customer';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function Appointment() {
	const [alert, setAlert] = useState([]);
	const date = new Date();
	const [selectedDate, setSelectedDate] = useState(date);
	const [customers, setCustomers] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [todayAppoints, setTodayAppoints] = useState([]);
	const [dayAppointments, setDayAppointments] = useState([]);
	const [selectedAppoint, setSelectedAppoint] = useState({
		id: 0,
		customer: { name: '', id: '', contact: '' },
		animal: { name: '', breed: '', id: '' },
		scheduleDate: '',
		scheduleTime: '',
		remarks: '',
	});

	const getAppoints = async (day) => {
		const dateString = formatDate(day);
		const dayAppoints = appointments.filter(
			(item) => formatDate(item.scheduleDate) === dateString
		);
		setDayAppointments(dayAppoints);
	};

	useEffect(async () => {
		const res = await getAllAppointments();
		if (res !== undefined) {
			setAppointments(res);
			const today = formatDate(date);
			const dayAppoints = res.filter(
				(item) => formatDate(item.scheduleDate) === today
			);
			setTodayAppoints(dayAppoints);
		}

		const customerRes = await getAllCustomers();
		if (customerRes !== undefined) setCustomers(customerRes);
	}, [0]);

	const handleDayClick = (day) => {
		setSelectedDate(day);
		getAppoints(day);
	};

	const handleRowSelect = (item) => {
		setSelectedAppoint(item);
	};

	return (
		<div>
			{/* <Alerts /> */}
			<Header />
			<Sidebar />
			<div className='sidebar-container'>
				<Grid container direction='row' spacing={1}>
					<Grid item xs={3}>
						<Grid container direction='column' spacing={2}>
							<Grid item>
								<Typography variant='body1'>Appointments Today</Typography>
							</Grid>
							<Grid item>
								<Grid container direction='row' justify='center'>
									<div className='petStatCard'>{todayAppoints.length}</div>
								</Grid>
								<br />
							</Grid>
							<Grid item>
								<DayPicker onDayClick={handleDayClick} />
							</Grid>
							<Grid item>
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
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<div className='appointmentCard'>
							<div className='detailCardHeader'>
								APPOINTMENTS ON {selectedDate.toLocaleDateString()}
							</div>
							<Table size='small' stickyHeader style={{ maxHeight: '60vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Time</StyledTableCell>
										<StyledTableCell>Description</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{dayAppointments.length > 0 ? (
										dayAppointments.map((item) => (
											<TableRow
												key={item.id}
												hover={true}
												onClick={() => handleRowSelect(item)}
												style={{ cursor: 'pointer' }}
											>
												<StyledTableCell>{item.scheduleTime}</StyledTableCell>
												<StyledTableCell>{item.remarks}</StyledTableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell>No Appointments</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</Grid>
					<Grid item xs={5}>
						<AppointmentDetail
							selectedAppointment={selectedAppoint}
							setAlert={setAlert}
							customers={customers}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Appointment;
