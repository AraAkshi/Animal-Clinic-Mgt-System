import {
	Grow,
	Backdrop,
	Modal,
	Typography,
	TextField,
	Button,
	Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import { setAlert } from '../../../../actions/alerts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCustomer } from '../../../../actions/customer';
import { addAppointment, formatDate } from '../../../../actions/appointment';

const AddAppointment = (props, { setAlert, addCustomer, addAppointment }) => {
	const { setOpen, open } = props;
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
		await addCustomer(name, email, address, contact);
		await addAppointment({ scheduleDate, scheduleTime, remarks, animal });
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
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
								onChange={(e) => onChange(e)}
								required
								minLength='6'
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
								minLength='6'
								style={{ marginTop: '0.6rem' }}
							/>
							<TextField
								size='small'
								name='animal'
								label='Pet Animal Type and Name'
								value={animal}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
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
								minLength='6'
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

AddAppointment.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addCustomer: PropTypes.func.isRequired,
	addAppointment: PropTypes.func.isRequired,
};

export default connect(null, {
	setAlert,
	addCustomer,
	addAppointment,
})(AddAppointment);