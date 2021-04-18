import React, { Fragment, useState } from 'react';
import {
	Grid,
	Table,
	TableCell,
	TableRow,
	Button,
	TableBody,
	withStyles,
	Modal,
	Backdrop,
	TableContainer,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteAppointment, formatDate } from '../../../services/appointment';
import EditClientAppoinment from './EditClientAppoinment';

const StyledTableCell = withStyles(() => ({
	body: {
		fontSize: 12,
	},
}))(TableCell);

function ClientAppointmentDetails(props) {
	const {
		appointmentsDue,
		appointmentsDone,
		setAlert,
		animals,
		allAppointments,
		treatmentsDue,
	} = props;
	const [open, setOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState();

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (appointment) => {
		setSelectedAppointment(appointment);
		setOpen(true);
	};

	const handleDelete = async () => {
		const res = await deleteAppointment(selectedAppointment.id);
		if (res !== undefined) {
			const newAlert = [
				{
					msg: 'Appointment Details Deleted Successfully',
					alertType: 'warning',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/my-profile`, '_self');
		}
	};

	return (
		<Fragment>
			<Grid container direction='column' spacing={2}>
				<Grid item xs={4}>
					<div className='container-detail'>Upcoming Treatments:</div>
					<TableContainer style={{ maxHeight: '15vh', overflowY: 'auto' }}>
						<Table size='small' stickyHeader>
							<TableBody>
								{treatmentsDue.length > 0 ? (
									treatmentsDue.map((item) => (
										<TableRow key={item.id}>
											<StyledTableCell>
												{formatDate(item.nextTreatmentDate)}
											</StyledTableCell>
											<StyledTableCell>{item.animal.name}</StyledTableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>No Upcoming Treatments</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item>
					<div className='container-detail'>Upcoming Appointments:</div>
					<TableContainer style={{ maxHeight: '15vh', overflowY: 'auto' }}>
						<Table size='small' stickyHeader>
							<TableBody>
								{appointmentsDue.length > 0 ? (
									appointmentsDue.map((item) => (
										<TableRow key={item.id}>
											<StyledTableCell>
												{formatDate(item.scheduleDate)}
											</StyledTableCell>
											<StyledTableCell>{item.scheduleTime}</StyledTableCell>
											<StyledTableCell>
												{item.remarks.toUpperCase()}
											</StyledTableCell>
											<StyledTableCell>
												{item.animal ? item.animal.name : ''}
											</StyledTableCell>
											<StyledTableCell>
												<Button
													endIcon={<EditIcon fontSize='small' />}
													size='small'
													color='secondary'
													variant='contained'
													style={{ fontSize: '0.9vw' }}
													onClick={() => handleEdit(item)}
												>
													Edit
												</Button>
											</StyledTableCell>
											{/* <StyledTableCell>
											<Button
												variant='contained'
												size='small'
												color='secondary'
												endIcon={<DeleteIcon fontSize='small' />}
												onClick={handleDelete}
											>
												Delete
											</Button>
										</StyledTableCell> */}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>No Upcoming Appointments</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item>
					<div className='container-detail'>Completed Appointments:</div>
					<TableContainer style={{ maxHeight: '40vh', overflowY: 'auto' }}>
						<Table size='small' stickyHeader>
							<TableBody>
								{appointmentsDone.length > 0 ? (
									appointmentsDone.map((item) => (
										<TableRow key={item.id}>
											<StyledTableCell>
												{formatDate(item.scheduleDate)}
											</StyledTableCell>
											<StyledTableCell>{item.scheduleTime}</StyledTableCell>
											<StyledTableCell>
												{item.remarks
													? item.remarks.toUpperCase()
													: 'No remarks noted'}
											</StyledTableCell>
											<StyledTableCell>
												{item.animal ? item.animal.name : ''}
											</StyledTableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>No Appointments</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<EditClientAppoinment
					selectedAppointment={selectedAppointment}
					setAlert={setAlert}
					setOpen={setOpen}
					animals={animals}
					appointments={allAppointments}
				/>
			</Modal>
		</Fragment>
	);
}

export default ClientAppointmentDetails;
