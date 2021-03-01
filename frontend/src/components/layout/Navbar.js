import React from 'react';
import {
	AppBar,
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
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from './style';
import { logout } from '../../services/auth';

const Navbar = () => {
	const classes = useStyles();
	const handleLogout = () => {
		logout();
	};
	const authLinks = (
		<ul>
			{/* <Button variant="text" size="small" color="secondary" href="/profile">
        <span className="hide-sm">{user && user.name}</span>
      </Button> */}
			<Button
				variant='contained'
				size='small'
				color='secondary'
				onClick={handleLogout}
			>
				Logout
			</Button>
		</ul>
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
						}}
					>
						<PetsIcon fontSize='large' />
						SHANE &amp; SHAWN
					</Typography>
					{/* <Button
            size="small"
            variant="contained"
            color="secondary"
            href="/register"
          >
            SIGN UP
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            href="/login"
          >
            LOGIN
          </Button> */}
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
					{['Home', 'Servies', 'Appointments', 'About Us'].map(
						(text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index === 0 ? (
										<HomeIcon />
									) : index === 1 ? (
										<PetsIcon />
									) : index === 2 ? (
										<ScheduleIcon />
									) : (
										<InfoIcon />
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
