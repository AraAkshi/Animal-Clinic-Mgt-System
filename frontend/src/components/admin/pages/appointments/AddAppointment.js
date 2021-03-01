import { Backdrop, Modal, TextField, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Alerts from '../../../layout/Alerts';
import Appointment from './Appointment';
import { addAppointment, formatDate } from '../../../../services/appointment';
import { addCustomer } from '../../../../services/customer';

const AddAppointment = () => {
	const [open, setOpen] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		contact: '',
		scheduleDate: '2021-01-01',
		scheduleTime: '00:00',
		animal: '',
		remarks: '',
	});

	const {
		name,
		email,
		address,
		contact,
		scheduleDate,
		scheduleTime,
		animal,
		remarks,
	} = formData;

	const onChange = (e) => {
		const value =
			e.target.name === 'scheduleDate'
				? formatDate(e.target.value)
				: e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			address: '',
			contact: '',
			scheduleDate: '2021-01-01',
			scheduleTime: '00:00',
			animal: '',
			remarks: '',
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const user = await addCustomer(name, email, address, contact);
		const res = await addAppointment({
			scheduleDate,
			scheduleTime,
			remarks,
			animal,
			user,
		});
		if (res !== undefined) {
			window.open(window.location.origin + `/admin/appointment`, '_self');
			alert('Appointment Details Added Successfully');
		}
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Alerts />
			<Appointment />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				aria-describedby='transition-modal-description'
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<div className='addModal'>
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<Grid
							container
							direction='column'
							spacing={1}
							style={{ padding: '1rem' }}
						>
							<TextField
								name='name'
								size='small'
								label='Full Name'
								value={name}
								onChange={(e) => onChange(e)}
								required
							/>
							<TextField
								name='email'
								size='small'
								label='Email'
								value={email}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
								required
							/>
							<TextField
								name='address'
								label='Address'
								size='small'
								value={address}
								onChange={(e) => onChange(e)}
								multiline
								rows={2}
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='number'
								size='small'
								name='contact'
								label='Contact No'
								value={contact}
								onChange={(e) => onChange(e)}
								required
								minLength='10'
								style={{ marginTop: '0.5rem' }}
							/>
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
								style={{ marginTop: '0.6rem' }}
							/>
							<TextField
								type='time'
								size='small'
								name='scheduleTime'
								label='Appointment Time'
								value={scheduleTime}
								onChange={(e) => onChange(e)}
								required
								style={{ marginTop: '0.6rem' }}
							/>
							<TextField
								size='small'
								name='animal'
								label='Pet Animal Type and Name'
								value={animal}
								onChange={(e) => onChange(e)}
								required
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								size='small'
								name='remarks'
								label='Additional Remarks'
								value={remarks}
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
// export default AddAppointment;
