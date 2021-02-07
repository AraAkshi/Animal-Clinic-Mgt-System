import {
  Card,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';

function Appointment() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid container direction="row" spacing={1}>
          <Grid item xs={3}>
            <DayPicker onDayClick={handleDayClick} />
          </Grid>
          <Grid item xs={4}>
            <Card className="appointmentCard">
              <Typography variant="body2">
                APPOINTMENTS ON {selectedDate.toLocaleDateString()}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Title</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card className="appointmentCard">
              <Typography variant="body2">APPOINTMENTS DETAILS</Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Appointment;
