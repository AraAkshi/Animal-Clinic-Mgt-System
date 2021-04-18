import React, { useState } from 'react';
import {
	Modal,
	Typography,
	TextField,
	Button,
	Grid,
	IconButton,
	InputAdornment,
} from '@material-ui/core';
import { changePassword } from '../../../services/auth';
import Alerts from '../layout/Alerts';
import ClientProfile from './ClientProfile';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function ChangePassword() {
	const [openAlert, setOpenAlert] = useState(false);
	const [formData, setFormData] = useState({
		email: localStorage.email,
		password: '',
		password2: '',
	});
	const [open, setOpen] = useState(true);
	const { email, password, password2 } = formData;
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [alert, setAlert] = useState([]);
	const [alertMsg, setAlertMsg] = useState();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		//Check password match
		if (password !== password2) {
			const newAlert = [
				{
					msg: 'Passwords do not match',
					alertType: 'danger',
					state: true,
				},
			];
			setAlert(newAlert);
			setAlertMsg('Passwords do not match. Please Try Again!');
			setOpenAlert(true);
			window.open(
				window.location.origin + `/my-profile/change-password`,
				'_self'
			);
		} else {
			const res = await changePassword(email, password);
			if (res !== undefined) {
				const newAlert = [
					{
						msg: 'Password Changed Successfully',
						alertType: 'success',
						state: true,
					},
				];
				setAlert(newAlert);
				window.open(window.location.origin + `/my-profile`, '_self');
			} else {
				const newAlert = [
					{
						msg: 'Invalid Email. Please Try Again!',
						alertType: 'danger',
						state: true,
					},
				];
				setAlert(newAlert);
				window.open(window.location.origin + `/my-profile`, '_self');
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
		window.open('/my-profile', '_self');
	};

	//Alert Close
	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const handlePasswordVisibility = (e) => {
		if (e === 'password')
			showPassword1 ? setShowPassword1(false) : setShowPassword1(true);
		if (e === 'password2')
			showPassword2 ? setShowPassword2(false) : setShowPassword2(true);
	};
	return (
		<div>
			<Alerts alerts={alert} />
			<ClientProfile />
			<Snackbar
				open={openAlert}
				autoHideDuration={6000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleAlertClose} severity='error'>
					{alertMsg}
				</Alert>
			</Snackbar>
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '50vh', width: '40vw', margin: 'auto' }}
			>
				<div className='addModal'>
					<Typography variant='h6' align='center'>
						Change Password
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
							/>
							<TextField
								type={showPassword1 ? 'text' : 'password'}
								size='small'
								name='password'
								label='New Password'
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
									href='/my-profile'
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
									SUBMIT
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</Modal>
		</div>
	);
}

export default ChangePassword;
