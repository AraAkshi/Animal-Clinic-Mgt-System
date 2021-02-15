import {
  Card,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Button,
  TableBody,
} from '@material-ui/core';
import React from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Animal() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Grid container direction="row" alignContent="center">
              <Grid item>
                <Typography variant="body1" style={{ paddingTop: '0.81rem' }}>
                  Total Pets Registered
                </Typography>
              </Grid>
              <Grid item>
                <div className="petStatCard">10</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="secondary"
              startIcon={<AddIcon />}
              href="/admin/animals/add-animal"
              variant="contained"
              style={{ margin: '0.5rem' }}
            >
              New Pet Details
            </Button>
          </Grid>
        </Grid>
        <hr className="seperatorLine" />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Animal;
