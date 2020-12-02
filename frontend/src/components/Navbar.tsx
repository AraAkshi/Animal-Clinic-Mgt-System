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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// import { logout } from '../../actions/clientAuth';

const Navbar = () => {
  // const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  // const authLinks = (
  //   <ul>
  //     <li>
  //       <Link to='/profile'>
  //         <i className='fas fa-user'></i>{' '}
  //         <span className='hide-sm'>{user && user.name}</span>
  //       </Link>
  //     </li>
  //     <li>
  //       <a onClick={logout} href='#!'>
  //         {' '}
  //         <i className='fas fa-sign-out-alt'></i>{' '}
  //         <span className='hide-sm'>LOGOUT</span>
  //       </a>
  //     </li>
  //   </ul>
  // );
  // const guestLinks = (
  //   <ul>
  //     <li>
  //       <Link to='/login'>LOGIN</Link>
  //     </li>
  //     <li>
  //       <Link to='/register'>SIGN UP</Link>
  //     </li>
  //   </ul>
  // );

  return (
    <div className="parent">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <i className="fa fa-paw" aria-hidden="true"></i>SHANE &amp; SHAWN
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {/* {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )} */}
    </div>
  );
};

// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(Navbar);
export default Navbar;
