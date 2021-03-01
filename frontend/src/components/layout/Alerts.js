import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Alerts = (props) => {
	const { alerts } = props;
	const [open, setOpen] = React.useState(alerts[0].state);
	const handleClose = () => {
		setOpen(false);
	};
	return (
		alerts !== null &&
		// alerts !== undefined &&
		alerts.length > 0 &&
		alerts.map((alerts) => (
			<Snackbar
				open={open}
				autoHideDuration={6000}
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
