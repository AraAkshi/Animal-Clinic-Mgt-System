import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Homepage from './layout/Homepage';
import Alerts from './layout/Alerts';
import {
	Modal,
	Typography,
	TextField,
	Button,
	Grid,
	IconButton,
	InputAdornment,
} from '@material-ui/core';
import { addCustomer } from '../../services/customer';
import { addUser } from '../../services/auth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		contact: '',
		password: '',
		password2: '',
	});
	const [alert, setAlert] = useState([]);
	const [open, setOpen] = useState(true);
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const { name, email, address, contact, password, password2 } = formData;

	//Handle Password Visibility
	const handlePasswordVisibility = (e) => {
		if (e === 'password')
			showPassword1 ? setShowPassword1(false) : setShowPassword1(true);
		if (e === 'password2')
			showPassword2 ? setShowPassword2(false) : setShowPassword2(true);
	};

	//reset form
	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			address: '',
			contact: '',
			password: '',
			password2: '',
		});
	};

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	//Handle Form Submit
	const onSubmit = async (e) => {
		e.preventDefault();

		//Check password match
		if (password.length < 6) {
			const newAlert = [
				{
					msg: 'Please enter a Password of minimum 6 characters',
					alertType: 'danger',
					state: true,
				},
			];
			setAlert(newAlert);
		} else if (password !== password2) {
			const newAlert = [
				{
					msg: 'Passwords do not match',
					alertType: 'danger',
					state: true,
				},
			];
			setAlert(newAlert);
		} else {
			const role = 'customer';
			const userRes = await addUser(email, password, role, name, false);
			const cusRes = await addCustomer(
				name.toUpperCase(),
				email,
				address.toUpperCase(),
				contact
			);
			if (userRes !== undefined && cusRes !== undefined) {
				window.open(window.location.origin + `/login`, '_self');
			} else {
				const newAlert = [
					{
						msg: userRes !== undefined ? cusRes : userRes,
						alertType: 'danger',
						state: true,
					},
				];
				setAlert(newAlert);
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
		window.open('/', '_self');
	};

	return (
		<div>
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
						Create Your Account
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
								value={name.toUpperCase()}
								onChange={(e) => onChange(e)}
								required
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
								type={showPassword1 ? 'text' : 'password'}
								size='small'
								name='password'
								label='Password'
								value={password}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
								style={{ marginTop: '0.5rem' }}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => handlePasswordVisibility('password')}
											>
												{showPassword1 ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Typography variant='caption' color='textSecondary'>
								*Please enter a password of minimum length of 6 characters
							</Typography>
							<TextField
								type={showPassword2 ? 'text' : 'password'}
								size='small'
								name='password2'
								label='Confirm Password'
								value={password2}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
								style={{ marginTop: '0.5rem' }}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => handlePasswordVisibility('password2')}
											>
												{showPassword2 ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
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
					<Typography variant='subtitle2' align='center'>
						Already have an Account? <Link to='/login'> Sign In </Link>
					</Typography>
				</div>
			</Modal>
		</div>
	);
};

export default Register;
