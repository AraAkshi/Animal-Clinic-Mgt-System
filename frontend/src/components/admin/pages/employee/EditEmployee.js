import {
	TextField,
	Button,
	Grid,
	Typography,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import { formatDate } from '../../../../services/appointment';
import { editEmployee } from '../../../../services/employee';

function EditEmployee(props) {
	const { selectedEmployee, setAlert, setOpen } = props;
	const [roles, setRoles] = useState([
		{ id: 1, name: 'DOCTOR' },
		{ id: 2, name: 'NURSE' },
		{ id: 3, name: 'RECEPTIONIST' },
		{ id: 4, name: 'HELPING STAFF' },
	]);
	const [formData, setFormData] = useState({
		name: selectedEmployee.name,
		nic: selectedEmployee.nic,
		degination: selectedEmployee.degination,
		joinedDate: formatDate(selectedEmployee.joinedDate),
		email: selectedEmployee.email,
		address: selectedEmployee.address,
		contact: selectedEmployee.contact,
		epfNo: selectedEmployee.epfNo,
		isActive: selectedEmployee.isActive,
	});

	const {
		isActive,
		nic,
		name,
		email,
		address,
		designation,
		epfNo,
		contact,
		joinedDate,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: selectedEmployee.name,
			nic: selectedEmployee.nic,
			degination: selectedEmployee.degination,
			joinedDate: formatDate(selectedEmployee.joinedDate),
			email: selectedEmployee.email,
			address: selectedEmployee.address,
			contact: selectedEmployee.contact,
			epfNo: selectedEmployee.epfNo,
			isActive: selectedEmployee.isActive,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await editEmployee(
			selectedEmployee.id,
			isActive,
			nic,
			name,
			email,
			address,
			designation,
			epfNo,
			contact,
			joinedDate
		);
		if (res !== undefined) {
			const newAlert = [
				{
					msg: 'Employee Details Updates Successfully',
					alertType: 'success',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/admin/employees`, '_self');
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
					<TextField
						name='name'
						size='small'
						label='Name'
						value={name.toUpperCase()}
						onChange={(e) => onChange(e)}
						style={{ marginTop: '0.5rem' }}
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
						style={{ marginTop: '0.5rem' }}
						required
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

export default EditEmployee;
