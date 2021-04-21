import React, { useState } from 'react';
import _ from 'lodash';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { formatDate, editAppointment } from '../../../services/appointment';
import { times } from '../../../services/datasets/appointment-times.d';

function EditClientAppoinment(props) {
  const {
    selectedAppointment,
    setAlert,
    setOpen,
    appointments,
    animals,
  } = props;

  const [formData, setFormData] = useState({
    id: selectedAppointment.id,
    customer: selectedAppointment.customer,
    scheduleDate: formatDate(selectedAppointment.scheduleDate),
    scheduleTime: selectedAppointment.scheduleTime,
    animal: selectedAppointment.animal,
    remarks: selectedAppointment.remarks,
    isAttended: selectedAppointment.isAttended,
  });
  const [availableTimes, setAvailableTimes] = useState(times);

  const {
    id,
    customer,
    scheduleDate,
    scheduleTime,
    animal,
    remarks,
    isAttended,
  } = formData;

  const onChange = async (e) => {
    //Get objects of the select components based on the value(id)
    const value =
      e.target.name === 'animal'
        ? animals.find((item) => item.id === e.target.value)
        : e.target.value;

    //Get Animls of the selected customer
    setFormData({ ...formData, [e.target.name]: value });

    //Get Available times for the selected date
    if (e.target.name === 'scheduleDate') {
      const dayAppointments = appointments.filter(
        (item) => formatDate(item.scheduleDate) === formatDate(value)
      );
      const notAvailTImes = [];
      for (let i = 0; i < dayAppointments.length; i++) {
        const time = times.find(
          (item) => item.time === dayAppointments[i].scheduleTime
        );
        notAvailTImes.push(time);
      }
      const availTimes = _.difference(times, notAvailTImes);
      setAvailableTimes(availTimes);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await editAppointment(
      id,
      isAttended,
      scheduleDate,
      scheduleTime,
      remarks,
      animal,
      customer
    );
    if (res !== undefined) {
      const newAlert = [
        {
          msg: 'Appointment Details Updated Successfully',
          alertType: 'success',
          state: true,
        },
      ];
      setAlert(newAlert);
      window.open(window.location.origin + `/my-profile`, '_self');
      setOpen(false);
    }
  };

  return (
    <div className="addModal">
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <Grid
          container
          direction="column"
          spacing={1}
          style={{ padding: '1rem' }}
        >
          <Grid container direction="row" style={{ marginTop: '0.5rem' }}>
            <Grid item xs={6}>
              <InputLabel id="animal" style={{ fontSize: '1vw' }}>
                Animal*
              </InputLabel>
              <Select
                labelId="animal"
                name="animal"
                value={animal !== null && animal !== undefined ? animal.id : ''}
                onChange={(e) => onChange(e)}
                required
              >
                {animals.length > 0 ? (
                  animals.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {`${item.breed} - ${item.name}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>None Available</MenuItem>
                )}
              </Select>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ marginTop: '0.5rem' }}
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                type="date"
                size="small"
                name="scheduleDate"
                label="Appointment Date"
                value={scheduleDate}
                inputProps={{
                  min: `${new Date().toISOString().split('T')[0]}`,
                }}
                onChange={(e) => onChange(e)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="scheduleTime" style={{ fontSize: '1vw' }}>
                Appointment Time*
              </InputLabel>
              <Select
                labelId="scheduleTime"
                name="scheduleTime"
                value={scheduleTime}
                onChange={(e) => onChange(e)}
                required
              >
                {availableTimes.length > 0 ? (
                  availableTimes.map((item) => (
                    <MenuItem key={item.id} value={item.time}>
                      {item.time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>None Available</MenuItem>
                )}
              </Select>
            </Grid>
          </Grid>
          <TextField
            size="small"
            name="remarks"
            label="Additional Remarks"
            value={remarks.toUpperCase()}
            onChange={(e) => onChange(e)}
            multiline
            rows={2}
            style={{ marginTop: '0.5rem' }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding: '1rem' }}
        >
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditClientAppoinment;
