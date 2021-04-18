import React from 'react';
import {
	AppBar,
	Grid,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from '../../../style';
import { logout } from '../../../services/auth';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = () => {
	const classes = useStyles();

	const handleLogout = () => {
		logout();
	};

	const handleHome = () => {
		window.open('/', '_self');
	};

	const handleMenuSelect = (index) => {
		if (index === 0) window.open('/', '_self');
		else if (index === 1) window.open('/services', '_self');
		else if (index === 2) window.open('/client/appointments', '_self');
		else if (index === 3) window.open('/about-us', '_self');
		else window.open('/my-profile', '_self');
	};

	const authLinks = (
		<Grid container direction='row' spacing={3} alignItems='middle'>
			<Grid item>
				{localStorage.userRole === 'admin' ||
				localStorage.userRole === 'employee' ? (
					<Button
						variant='contained'
						size='small'
						color='secondary'
						href='/admin/dashboard'
						startIcon={<SupervisorAccountIcon fontSize='small' />}
					>
						ADMIN
					</Button>
				) : (
					<Grid item>
						{localStorage.token && localStorage.username ? (
							<Button
								size='small'
								variant='text'
								color='inherit'
								startIcon={<PersonIcon fontSize='small' />}
								href='/my-profile'
							>
								HI {localStorage.username.toUpperCase()}
							</Button>
						) : (
							''
						)}
					</Grid>
				)}
			</Grid>
			<Grid item>
				<Button
					variant='contained'
					size='small'
					color='secondary'
					onClick={handleLogout}
					endIcon={<ExitToAppIcon fontSize='small' />}
				>
					LOGOUT
				</Button>
			</Grid>
		</Grid>
	);
	const guestLinks = (
		<ul>
			<Button variant='contained' size='small' color='secondary' href='/login'>
				LOGIN
			</Button>
			&nbsp; &nbsp;
			<Button
				variant='contained'
				size='small'
				color='secondary'
				href='/register'
			>
				SIGN UP
			</Button>
		</ul>
	);

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div style={{ flexGrow: 1 }}>
			<AppBar position='static' className={classes.navbar}>
				<Toolbar>
					<IconButton
						style={{ marginLeft: '-2rem' }}
						edge='start'
						color='inherit'
						onClick={handleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h5'
						style={{
							flexGrow: 1,
							paddingLeft: '0.5rem',
							fontFamily: 'Potta One',
							cursor: 'pointer',
						}}
						onClick={handleHome}
					>
						<PetsIcon fontSize='large' />
						SHANE &amp; SHAWN
					</Typography>
					<div>
						{localStorage.token && localStorage.username
							? authLinks
							: guestLinks}
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				style={{
					backgroundColor: 'rgba(255, 255, 255, 0.6)',
				}}
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List style={{ marginTop: '1rem' }}>
					{['Home', 'Servies', 'Appointments', 'About Us', 'My Profile'].map(
						(text, index) => (
							<ListItem
								button
								key={text}
								onClick={() => handleMenuSelect(index)}
							>
								<ListItemIcon>
									{index === 0 ? (
										<HomeIcon />
									) : index === 1 ? (
										<PetsIcon />
									) : index === 2 ? (
										<ScheduleIcon />
									) : index === 3 ? (
										<InfoIcon />
									) : (
										<PersonIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						)
					)}
				</List>
			</Drawer>
		</div>
	);
};

export default Navbar;
