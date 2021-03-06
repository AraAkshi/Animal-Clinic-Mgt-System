import {
	Backdrop,
	Modal,
	TextField,
	Button,
	Grid,
	Typography,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import { addUser } from '../../../../services/auth';
import { roles } from '../../../../services/datasets/employee-roles.d';
import { accesssLevels } from '../../../../services/datasets/access-levels.d';
import { addEmployee } from '../../../../services/employee';
import Alerts from '../../../client/layout/Alerts';
import Employee from './Employee';
import { formatDate } from '../../../../services/appointment';
const generator = require('generate-password');

function AddEmployee() {
	const d = new Date();
	const date = formatDate(d);
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState([]);

	const [formData, setFormData] = useState({
		nic: '',
		name: '',
		email: '',
		address: '',
		designation: '',
		epfNo: '',
		contact: '',
		role: '',
		joinedDate: date,
	});

	const {
		nic,
		name,
		email,
		address,
		designation,
		epfNo,
		contact,
		role,
		joinedDate,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			nic: '',
			name: '',
			email: '',
			address: '',
			designation: '',
			epfNo: '',
			contact: '',
			role: '',
			joinedDate: date,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addEmployee(
			nic,
			name,
			email,
			address,
			designation,
			epfNo,
			contact,
			joinedDate
		);
		//Auto Generate Password
		const password = generator.generate({
			length: 8,
			numbers: true,
			symbols: true,
		});
		const userRes = await addUser(email, password, role, name, true);
		if (res !== undefined && userRes !== undefined) {
			const newAlert = [
				{
					msg: 'Employee Details Added Successfully',
					alertType: 'success',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/admin/employees`, '_self');
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Alerts alerts={alert} />
			<Employee />
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
							style={{ padding: '1rem', marginTop: '-1rem' }}
						>
							<TextField
								name='name'
								size='small'
								label='Name'
								value={name.toUpperCase()}
								onChange={(e) => onChange(e)}
								required
							/>
							<Typography variant='caption' color='textSecondary'>
								*Please enter the First Name and Last Name
							</Typography>
							<TextField
								name='nic'
								label='NIC No'
								size='small'
								inputProps={{ maxLength: 12, minLength: 10 }}
								value={nic.toUpperCase()}
								onChange={(e) => onChange(e)}
								required
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='email'
								name='email'
								label='Email'
								size='small'
								value={email}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								name='address'
								label='Address'
								size='small'
								value={address.toUpperCase()}
								onChange={(e) => onChange(e)}
								required
								multiline
								rows={2}
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='number'
								name='contact'
								label='Contact'
								size='small'
								value={contact}
								inputProps={{ maxLength: 10 }}
								onChange={(e) => onChange(e)}
								required
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='number'
								name='epfNo'
								label='EPF No'
								size='small'
								value={epfNo}
								onChange={(e) => onChange(e)}
								required
								style={{ marginTop: '0.5rem' }}
							/>
							<InputLabel id='designation' style={{ marginTop: '0.5rem' }}>
								Designation
							</InputLabel>
							<Select
								labelId='designation'
								name='designation'
								value={designation}
								onChange={(e) => onChange(e)}
								required
							>
								{roles.length > 0 ? (
									roles.map((item) => (
										<MenuItem key={item.id} value={item.name}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>None Available</MenuItem>
								)}
							</Select>
							<TextField
								type='date'
								size='small'
								name='joinedDate'
								label='Joined Date'
								value={joinedDate}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<InputLabel id='role' style={{ marginTop: '0.5rem' }}>
								Access Level
							</InputLabel>
							<Select
								labelId='role'
								name='role'
								value={role}
								onChange={(e) => onChange(e)}
								required
							>
								{accesssLevels.length > 0 ? (
									accesssLevels.map((item) => (
										<MenuItem key={item.id} value={item.value}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>None Available</MenuItem>
								)}
							</Select>
						</Grid>
						<Grid
							container
							direction='row'
							spacing={3}
							justify='center'
							style={{ padding: '0.5rem' }}
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
}

export default AddEmployee;
