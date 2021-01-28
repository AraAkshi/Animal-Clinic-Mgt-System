import React from 'react'
import CopyrightIcon from '@material-ui/icons/Copyright';
import { Typography, Grid } from '@material-ui/core';

function Footer() {
  return (
    <div className='footer'>
      <Typography variant='caption' style={{ color: '#f7f7f7' }}>
				<Grid container direction='row' justify='center'>
					<Grid item>Developed by&nbsp;</Grid>
					<Grid item>
						<CopyrightIcon fontSize='small' />
					</Grid>
					<Grid item>&nbsp;Ishara 2021</Grid>
				</Grid>
			</Typography>
    </div>
  )
}

export default Footer
