import {
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
} from '@material-ui/core';
import React, { useState } from 'react';
import { getCusAnimals } from '../../../../services/animal';
import {
	editAppointment,
	formatDate,
	formatTime,
} from '../../../../services/appointment';

function EditAppointment(props) {
	const { selectedAppointment, setAlert, setOpen, customers } = props;
	const [animals, setAnimals] = useState([]);
	const [formData, setFormData] = useState({
		id: selectedAppointment.id,
		customer: selectedAppointment.customer,
		scheduleDate: formatDate(selectedAppointment.scheduleDate),
		scheduleTime: formatTime(selectedAppointment.scheduleTime),
		animal: selectedAppointment.animal,
		remarks: selectedAppointment.remarks,
		isAttended: selectedAppointment.isAttended,
	});

	const {
		id,
		customer,
		scheduleDate,
		scheduleTime,
		animal,
		remarks,
		isAttended,
	} = formData;

	const onChange = async (e) => {
		if (e.target.name == 'customer') {
			const animalRes = await getCusAnimals(e.target.value.id);
			if (animalRes !== undefined) setAnimals(animalRes);
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			id: selectedAppointment.id,
			customer: selectedAppointment.customer,
			scheduleDate: formatDate(selectedAppointment.scheduleDate),
			scheduleTime: formatTime(selectedAppointment.scheduleTime),
			animal: selectedAppointment.animal,
			remarks: selectedAppointment.remarks,
			isAttended: selectedAppointment.isAttended,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await editAppointment(
			id,
			isAttended,
			scheduleDate,
			scheduleTime,
			remarks,
			animal,
			customer
		);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Appointment Details Updated Successfully',
				alertType: 'success',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/appointments`, '_self');
			setOpen(false);
		}
	};

	return (
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
							<InputLabel id='customer'>Customer</InputLabel>
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
							<InputLabel id='animal'>Animal</InputLabel>
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
						name='remarks'
						label='Additional Remarks'
						value={remarks.toUpperCase()}
						onChange={(e) => onChange(e)}
						multiline
						rows={2}
						style={{ marginTop: '0.5rem' }}
					/>
					<FormLabel component='legend' style={{ marginTop: '0.5rem' }}>
						Is Attended
					</FormLabel>
					<RadioGroup
						name='isAttended'
						value={isAttended}
						required
						row
						onChange={onChange}
					>
						<FormControlLabel value={true} control={<Radio />} label='Yes' />
						<FormControlLabel value={false} control={<Radio />} label='No' />
					</RadioGroup>
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
	);
}

export default EditAppointment;
