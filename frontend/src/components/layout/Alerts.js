import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerts = ({ alerts }) => {
  const [open, setOpen] = React.useState(true);
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

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
