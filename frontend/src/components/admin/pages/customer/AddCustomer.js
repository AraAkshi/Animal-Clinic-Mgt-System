import {
	Backdrop,
	Modal,
	TextField,
	Button,
	Grid,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Alerts from '../../../layout/Alerts';
import Customer from './Customer';
import { addCustomer } from '../../../../services/customer';

function AddCustomer() {
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		remarks: '',
		contact: 0,
	});

	const { name, email, address, contact, remarks } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			address: '',
			remarks: '',
			contact: 0,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addCustomer(name, email, address, remarks, contact);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Customer Details Added Successfully',
				alertType: 'success',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/customers`, '_self');
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Alerts alerts={alert} />
			<Customer />
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
								value={contact}
								inputProps={{ maxLength: 10 }}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								name='remarks'
								label='Remarks'
								size='small'
								multiline
								rows={2}
								value={remarks.toUpperCase()}
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
			</Modal>
		</div>
	);
}

export default AddCustomer;
