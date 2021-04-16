import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from '../../../style';
import { logout } from '../../../services/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () => {
	const classes = useStyles();

	const handleLogout = () => {
		logout();
	};

	const handleHome = () => {
		window.open('/', '_self');
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
									cursor: 'pointer',
								}}
								onClick={handleHome}
							>
								<PetsIcon fontSize='large' />
								SHANE &amp; SHAWN
							</Typography>
						</Grid>
						<Grid item>
							<Grid
								container
								direction='row'
								spacing={3}
								style={{ paddingTop: '0.5rem' }}
							>
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
										endIcon={<ExitToAppIcon fontSize='small' />}
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
