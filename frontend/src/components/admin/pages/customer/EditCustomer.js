import { TextField, Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { editCustomer } from '../../../../services/customer';

function EditCustomer(props) {
	const { selectedCustomer, setAlert, setOpen } = props;
	const [formData, setFormData] = useState({
		name: selectedCustomer.name,
		email: selectedCustomer.email,
		address: selectedCustomer.address,
		contact: selectedCustomer.contact,
		remarks: selectedCustomer.remarks,
		isActive: selectedCustomer.isActive,
	});

	const { name, email, address, contact, isActive, remarks } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: selectedCustomer.name,
			email: selectedCustomer.email,
			address: selectedCustomer.address,
			contact: selectedCustomer.contact,
			remarks: selectedCustomer.remarks,
			isActive: selectedCustomer.isActive,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await editCustomer(
			selectedCustomer.id,
			isActive,
			name,
			email,
			address,
			contact,
			remarks
		);
		if (res !== undefined) {
			const newAlert = [
				{
					msg: 'Customer Details Updates Successfully',
					alertType: 'success',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/admin/customers`, '_self');
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
						multiline
						rows={2}
						style={{ marginTop: '0.5rem' }}
					/>
					<TextField
						type='number'
						name='contact'
						label='Contact'
						size='small'
						inputProps={{ maxLength: 10 }}
						value={contact}
						onChange={(e) => onChange(e)}
						style={{ marginTop: '0.5rem' }}
					/>
					<TextField
						name='remarks'
						label='Remarks'
						size='small'
						multiline
						rows={2}
						value={remarks ? remarks.toUpperCase() : ''}
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

export default EditCustomer;
