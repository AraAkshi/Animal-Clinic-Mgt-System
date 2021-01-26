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
import MenuIcon from "@material-ui/icons/Menu";
import PetsIcon from "@material-ui/icons/Pets";
import ScheduleIcon from "@material-ui/icons/Schedule";
import InfoIcon from "@material-ui/icons/Info";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import { useStyles } from "./style";
import { logout } from "../../actions/loginAuth";

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const authLinks = (
    <ul>
      <li>
        <i className="fas fa-user"></i>{" "}
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
  const guestLinks = (
    <ul>
      <li>
        <Button variant="contained" color="secondary" href="/login">
          LOGIN
        </Button>
      </li>
      <li>
        <Button variant="contained" color="secondary" href="/register">
          SIGN UP
        </Button>
      </li>
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
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" style={{ flexGrow: 1, paddingLeft: "1rem" }}>
            <PetsIcon fontSize="large" />
            &nbsp; SHANE &amp; SHAWN
          </Typography>
          <Button variant="contained" color="secondary" href="/register">
            SIGN UP
          </Button>
          {/* {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )} */}
        </Toolbar>
      </AppBar>
      <Drawer
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
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
        <List style={{ marginTop: "1rem" }}>
          {["Home", "Servies", "Appointments", "About Us"].map(
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

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
