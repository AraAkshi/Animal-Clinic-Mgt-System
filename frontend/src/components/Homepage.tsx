import React, { Fragment } from "react";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="bg-image">
        <div className="homepage-container">
          <div className="homepage-text">
            <h1 className="x-large">
              WELCOME TO SHANE &amp; SHAWN ANIMAL CLINIC
            </h1>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
