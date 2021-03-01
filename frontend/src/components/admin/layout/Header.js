import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from '../../layout/style';
import { logout } from '../../../services/auth';

const Header = () => {
	const classes = useStyles();
	const authLinks = (
		<ul>
			<li>
				<PersonIcon />
				<span className='hide-sm'>{localStorage.username}</span>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>LOGOUT</span>
				</a>
			</li>
		</ul>
	);

	const handleLogout = () => {
		logout();
	};

	return (
		<div style={{ flexGrow: 1 }}>
			<AppBar position='static' className={classes.navbar}>
				<Toolbar>
					<Typography
						variant='h5'
						style={{
							flexGrow: 1,
							marginLeft: '-2rem',
							fontFamily: 'Potta One',
						}}
					>
						<PetsIcon fontSize='large' />
						SHANE &amp; SHAWN
					</Typography>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						href='/'
						onClick={handleLogout}
					>
						LOGOUT
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
