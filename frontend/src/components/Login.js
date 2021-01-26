import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../actions/loginAuth";
import Homepage from "./layout/Homepage";
import PropTypes from "prop-types";
import Alerts from "./layout/Alerts";
import { Modal, Typography, TextField, Button, Grid } from "@material-ui/core";

const Login = ({ userLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(true);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    userLogin(email, password);
  };

  const handleClose = () => {
    setOpen(false);
    window.open("/", "_self");
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Homepage />
      <Modal
        open={open}
        onClose={handleClose}
        style={{ height: "70vh", width: "30vw", margin: "auto" }}
      >
        <div className="loginModal">
          <Typography variant="h4" align="center">
            LOGIN
          </Typography>
          <Typography variant="h6" align="center">
            <i className="fas fa-user"></i>Sign into Your Account
          </Typography>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{ padding: "1rem" }}
            >
              <TextField
                name="email"
                label="Email"
                value={email}
                onChange={(e) => onChange(e)}
                required
                color="secondary"
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                color="secondary"
                style={{ marginTop: "1rem" }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="center"
              style={{ padding: "1rem" }}
            >
              <Grid item>
                <Button variant="contained" color="secondary" href="/">
                  CANCEL
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  <input type="submit" style={{ display: "none" }} />
                  LOGIN
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography variant="subtitle1" align="center">
            Don't have an Account? <Link to="/register"> Sign Up </Link>
          </Typography>
        </div>
      </Modal>
      <section className="container">{/* <Alerts /> */}</section>
    </Fragment>
  );
};

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { userLogin })(Login);
