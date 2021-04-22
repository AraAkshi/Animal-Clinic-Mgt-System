import { Grid } from '@material-ui/core';
import React from 'react';
import Navbar from './layout/Navbar';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import logo from '../../images/logo.jpg';

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="bg-image">
        <div className="dark-overlay"></div>
        <div
          style={{
            marginTop: '3.5rem',
            zIndex: 5,
          }}
        >
          <Grid container direction="row" justify="space-between">
            <Grid item xs={3}>
              <img
                src={logo}
                style={{
                  width: 550,
                  height: 550,
                  marginLeft: '2rem',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                  margin: 'auto',
                  marginTop: '4rem',
                  marginRight: '4rem',
                  padding: '3rem',
                }}
              >
                <div
                  style={{
                    fontSize: '4vw',
                    color: '#fff',
                    textAlign: 'left',
                    fontFamily: 'antonio',
                  }}
                >
                  WE CARE FOR YOUR PET LIKE OUR OWN
                </div>
                <div
                  style={{
                    fontSize: '1.5vw',
                    color: '#f4f4f4',
                    textAlign: 'left',
                    fontFamily: 'Montserrat',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  We ensure to deliver the Best Quality Services and Products
                  with our Exceptional Medical team
                </div>
                <Grid
                  container
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    width: '35vw',
                    margin: 'auto',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div className="contact-details">
                    CONTACT US ON: 071 054 3085, 011 231 6542
                  </div>
                  <div className="contact-details">
                    VISIT US AT: NO 50 MOLAMURE ROAD, KEGALLE
                  </div>
                  <div className="contact-details">
                    FIND US ON: {<FacebookIcon fontSize="small" />}{' '}
                    {<InstagramIcon fontSize="small" />}
                  </div>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
