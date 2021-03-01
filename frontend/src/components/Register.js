import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Homepage from './layout/Homepage';
import Alerts from './layout/Alerts';
import { Modal, Typography, TextField, Button, Grid } from '@material-ui/core';
import { addCustomer } from '../services/customer';
import { addUser } from '../services/auth';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		contact: '',
		password: '',
		password2: '',
	});
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [open, setOpen] = useState(true);
	const { name, email, address, contact, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== password2) {
			const newAlert = {
				msg: 'Passwords do not match',
				alertType: 'danger',
				state: true,
			};
			setAlert({ ...alert, newAlert });
		} else {
			const role = 'customer';
			const userRes = await addUser(email, password, role, name);
			const cusRes = await addCustomer(name, email, address, contact);
			if (userRes !== undefined && cusRes !== undefined)
				return <Redirect to='/' />;
			// else {
			// 	const newAlert = {
			// 		msg: userRes !== undefined ? cusRes : userRes,
			// 		alertType: 'danger',
			// 		state: true,
			// 	};
			// 	setAlert({ ...alert, newAlert });
			// }
		}
	};

	const handleClose = () => {
		setOpen(false);
		window.open('/', '_self');
	};

	return (
		<Fragment>
			<Alerts alerts={alert} />
			<Homepage />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
			>
				<div className='loginModal'>
					<Typography variant='h5' align='center'>
						SIGN UP
					</Typography>
					<Typography variant='h6' align='center'>
						<i className='fas fa-user'></i>Create Your Account
					</Typography>
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
								value={name}
								onChange={(e) => onChange(e)}
								required
								color='secondary'
							/>
							<Typography variant='caption' color='textSecondary'>
								*Please enter your First Name and Last Name
							</Typography>
							<TextField
								name='email'
								size='small'
								label='Email'
								value={email}
								onChange={(e) => onChange(e)}
								required
								color='secondary'
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
								color='secondary'
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
								color='secondary'
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='password'
								size='small'
								name='password'
								label='Password'
								value={password}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
								color='secondary'
								style={{ marginTop: '0.5rem' }}
							/>
							<Typography variant='caption' color='textSecondary'>
								*Please enter a password of minimum length of 6 characters
							</Typography>
							<TextField
								type='password'
								size='small'
								name='password2'
								label='Confirm Password'
								value={password2}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
								color='secondary'
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
								<Button size='small' variant='contained' color='secondary'>
									<input type='reset' style={{ display: 'none' }} />
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
					<Typography variant='subtitle2' align='center'>
						Already have an Account? <Link to='/login'> Sign In </Link>
					</Typography>
				</div>
			</Modal>
		</Fragment>
	);
};

export default Register;
