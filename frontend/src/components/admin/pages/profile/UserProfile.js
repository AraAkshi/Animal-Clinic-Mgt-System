import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import EditIcon from '@material-ui/icons/Edit';
import { getOneEmployee } from '../../../../services/employee';
import { formatDate } from '../../../../services/appointment';

function UserProfile() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getOneEmployee(localStorage.email);
      if (res !== undefined) setDetails(res);
      console.log(res);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <div className="container-header">MY PROFILE DETAILS</div>
        <Grid
          container
          justify="center"
          className="detailCard"
          style={{
            fontSize: 12,
            // marginLeft: '-2rem',
            padding: '2rem',
            width: '60vw',
          }}
        >
          {details !== null && details !== undefined ? (
            <Grid
              container
              direction="column"
              style={{ backgroundColor: '#fff' }}
              // justify="center"
            >
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">NAME</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.name !== undefined
                        ? details.name.toUpperCase()
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">NIC</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.nic !== undefined ? details.nic : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">DESIGNATION</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.designation !== undefined
                        ? details.designation
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">EPF NO</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.epfNo !== undefined
                        ? details.epfNo !== 0
                          ? details.epfNo
                          : ''
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">CONTACT</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.contact !== undefined
                        ? details.contact !== 0
                          ? details.contact
                          : ''
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">EMAIL</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.email !== undefined ? details.email : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">ADDRESS</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.email !== undefined
                        ? details.address.toUpperCase()
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <div className="detailCardItem">JOINED DATE</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="detailCardValue">
                      {details.joinedDate !== undefined
                        ? details.joinedDate !== ''
                          ? formatDate(details.joinedDate)
                          : details.joinedDate
                        : ''}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<EditIcon fontSize="small" />}
                  size="small"
                  color="secondary"
                  variant="contained"
                  style={{ fontSize: '0.9vw' }}
                  href="/admin/change-password"
                >
                  change password
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography>No Details to Display</Typography>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default UserProfile;
