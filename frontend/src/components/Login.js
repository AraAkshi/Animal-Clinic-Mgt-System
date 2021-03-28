import React, { Fragment, useState } from 'react';
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
import { login } from '../services/auth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [open, setOpen] = useState(true);
	const { email, password } = formData;
	const [showPassword, setShowPassword] = useState(false);
	const [alert, setAlert] = useState([]);
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await login(email, password);
		if (res !== undefined) {
			if (res.userrole === 'customer') {
				window.open(window.location.origin + `/`, '_self');
			} else {
				window.open(window.location.origin + `/admin/dashboard`, '_self');
			}
		} else {
			const newAlert = [
				{
					msg: 'Invalid Login Credentials. Please Try Again!',
					alertType: 'danger',
					state: true,
				},
			];
			setAlert(newAlert);
		}
	};

	const handleClose = () => {
		setOpen(false);
		window.open('/', '_self');
	};

	const handlePasswordVisibility = () => {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	};

	return (
		<Fragment>
			<Alerts alerts={alert} />
			<Homepage />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '70vh', width: '30vw', margin: 'auto' }}
			>
				<div className='loginModal'>
					<Typography variant='h5' align='center'>
						LOGIN
					</Typography>
					<Typography variant='h6' align='center'>
						<i className='fas fa-user'></i>Sign into Your Account
					</Typography>
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<Grid
							container
							direction='column'
							spacing={1}
							style={{ padding: '1rem' }}
						>
							<TextField
								name='email'
								size='small'
								label='Email'
								value={email}
								onChange={(e) => onChange(e)}
								required
								color='secondary'
							/>
							<TextField
								type={showPassword ? 'text' : 'password'}
								size='small'
								name='password'
								label='Password'
								value={password}
								onChange={(e) => onChange(e)}
								required
								minLength='6'
								color='secondary'
								style={{ marginTop: '1rem' }}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={handlePasswordVisibility}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
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
									href='/'
								>
									CANCEL
								</Button>
							</Grid>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onSubmit}
								>
									LOGIN
								</Button>
							</Grid>
						</Grid>
					</form>
					<Typography variant='subtitle2' align='center'>
						Don't have an Account? <Link to='/register'> Sign Up </Link>
					</Typography>
				</div>
			</Modal>
			<section className='container'>{/* <Alerts /> */}</section>
		</Fragment>
	);
};

export default Login;
