import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from '../../layout/style';
import { logout } from '../../../services/auth';

const Header = () => {
	const classes = useStyles();

	const handleLogout = () => {
		logout();
	};

	return (
		<div style={{ flexGrow: 1 }}>
			<AppBar position='static' className={classes.navbar}>
				<Toolbar>
					<Grid container direction='row' justify='space-between'>
						<Grid item>
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
						</Grid>
						<Grid item>
							<Grid container direction='row' spacing={3}>
								<Grid item>
									<Grid
										container
										direction='row'
										style={{ marginTop: '0.3rem' }}
									>
										<Grid item>
											<PersonIcon fontSize='small' />
										</Grid>
										<Grid item>
											<Typography variant='body2'>
												{`HI ${localStorage.username.toUpperCase()}`}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Button
										size='small'
										variant='contained'
										color='secondary'
										href='/'
										onClick={handleLogout}
									>
										LOGOUT
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
