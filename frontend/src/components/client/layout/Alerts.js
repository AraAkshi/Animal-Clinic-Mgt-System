import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Alerts = (props) => {
	const { alerts } = props;
	console.log(alerts);
	const alert = alerts !== undefined ? true : false;
	const [open, setOpen] = React.useState(alert);
	const handleClose = () => {
		setOpen(false);
	};

	return (
		alerts !== null &&
		alerts !== undefined &&
		alerts.length > 0 &&
		alerts.map((alerts) => (
			<Snackbar
				open={open}
				autoHideDuration={60000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={handleClose}
					severity={alerts.alertType === 'danger' ? 'error' : alerts.alertType}
				>
					{alerts.msg}
				</Alert>
			</Snackbar>
		))
	);
};

export default Alerts;
