import { Typography, Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { useStyles } from "./style";
import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/4.jpg";
import LandingItem from "./LandingItem";

const Landing = () => {
  const classes = useStyles();

  const items = [
    { image: img1, title: "SERVICES", link: "/services" },
    { image: img2, title: "APPOINTMENTS", link: "/appointment" },
    { image: img3, title: "ABOUT US", link: "/aboutUs" },
  ];

  return (
    <Fragment>
      <Navbar />
      <section className="bg-image">
        <Typography variant="h3" className={classes.homepageText}>
          WELCOME TO SHANE &amp; SHAWN ANIMAL CLINIC
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          // spacing={2}
          style={{ marginTop: "5rem" }}
        >
          {items.map((item) => {
            return (
              <Grid item>
                <LandingItem
                  img={item.image}
                  title={item.title}
                  link={item.link}
                />
              </Grid>
            );
          })}
        </Grid>
      </section>
    </Fragment>
  );
};

export default Landing;
