import React from 'react';
import Navbar from './layout/Navbar';
import svg from '../../images/contruction.png';
import { Grid } from '@material-ui/core';

function Services() {
  if (document.querySelector('.animation')) {
    forceAnimation(splitText(document.querySelector('.animation')));
  }

  function splitText(container = false) {
    if (container != false) {
      var string = container.innerHTML;
      var textarr = string.split('');
      var stop = textarr.length;
      var buffer = '';
      for (var i = 0; i < stop; i++) {
        buffer += <span class="anim-' + i + '"> + {textarr[i]} + </span>;
      }
      container.innerHTML = buffer;
      return stop;
    }
  }

  function forceAnimation(stop = false) {
    if (stop != false) {
      for (var i = 0; i < stop; i++) {
        var letter = document.querySelector('.anim-' + i);
        letter.addEventListener('mouseover', function () {
          this.classList.add('animate');
        });
        letter.addEventListener('animationend', function () {
          this.classList.remove('animate');
        });
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="bg-image">
        <div className="dark-overlay"></div>
        <div
          // className="animation"
          style={{
            zIndex: 5,
            margin: 'auto',
            marginTop: '6rem',
            fontFamily: 'Montserrat',
            fontSize: '3vw',
            textAlign: 'center',
            color: '#f4f4f4',
          }}
        >
          PAGE UNDER CONSTRUCTION
        </div>
        <Grid container justify="center">
          <img
            src={svg}
            style={{
              width: 500,
              height: 500,
            }}
          />
        </Grid>
      </div>
    </div>
  );
}

export default Services;
