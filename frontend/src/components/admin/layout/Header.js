import React, { Fragment } from "react";
import { Link, Router } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
} from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import PersonIcon from "@material-ui/icons/Person";
import { useStyles } from "../../layout/style";
import { logout } from "../../../actions/loginAuth";

const Header = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const authLinks = (
    <ul>
      <li>
        <PersonIcon />
        <span className="hide-sm">{user && user.name}</span>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">LOGOUT</span>
        </a>
      </li>
    </ul>
  );

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1, marginLeft: "-2rem" }}>
            <PetsIcon fontSize="large" />
            &nbsp; SHANE &amp; SHAWN
          </Typography>
          <Button variant="contained" color="secondary" href="/register">
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
