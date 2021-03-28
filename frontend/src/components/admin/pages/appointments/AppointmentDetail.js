import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Grid, Modal, Backdrop } from '@material-ui/core';
import {
	deleteAppointment,
	formatDate,
} from '../../../../services/appointment';
import EditAppointment from './EditAppointment';

function AppointmentDetail(props) {
	const { selectedAppointment, setAlert, customers } = props;
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = async () => {
		setOpen(true);
	};
	const handleDelete = async () => {
		const res = await deleteAppointment(selectedAppointment.id);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Appointment Details Deleted Successfully',
				alertType: 'warning',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/appointments`, '_self');
		}
	};

	return (
		<div>
			<div className='detailCard'>
				<div className='detailCardHeader'>APPOINTMENT DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>DATE</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedAppointment.scheduleDate !== ''
										? formatDate(selectedAppointment.scheduleDate)
										: selectedAppointment.scheduleDate}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>TIME</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedAppointment.scheduleTime}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>DESCRIPTION</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedAppointment.remarks}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>CUSTOMER</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{`${selectedAppointment.customer.name} - ${selectedAppointment.customer.contact}`}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>ANIMAL</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedAppointment.animal !== null
										? `${selectedAppointment.animal.name} - ${selectedAppointment.animal.breed}`
										: ''}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>IS ATTENDED</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedAppointment.isAttended ? 'YES' : 'NO'}
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div style={{ marginTop: '1.5rem' }}>
					<Grid container direction='row' justify='space-evenly'>
						<Button
							startIcon={<EditIcon fontSize='small' />}
							size='small'
							color='secondary'
							variant='contained'
							style={{ fontSize: '0.9vw' }}
							onClick={handleEdit}
						>
							Edit
						</Button>
						<Button
							variant='contained'
							size='small'
							color='secondary'
							startIcon={<DeleteIcon fontSize='small' />}
							style={{
								visibility:
									localStorage.userRole === 'admin' ? 'visible' : 'hidden',
								fontSize: '0.9vw',
							}}
							onClick={handleDelete}
						>
							Delete
						</Button>
					</Grid>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<EditAppointment
					selectedAppointment={selectedAppointment}
					setAlert={setAlert}
					setOpen={setOpen}
					customers={customers}
				/>
			</Modal>
		</div>
	);
}

export default AppointmentDetail;
