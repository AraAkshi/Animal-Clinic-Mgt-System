import { Backdrop, Modal, TextField, Button, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useState } from 'react';
import { setAlert } from '../../../../actions/alerts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAnimal } from '../../../../actions/animal';
import Alerts from '../../../layout/Alerts';
import Animal from './Animal';
import { getCustomers } from '../../../../actions/customer';
import { getAnimalTypes } from '../../../../actions/animalType';

const AddAnimal = ({ setAlert, addAnimal, getCustomers, getAnimalTypes }) => {
  const [open, setOpen] = useState(true);
  const customers = async () => await getCustomers();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    bloodGroup: '',
    dateOfBirth: '',
    specialRemarks: '',
    customer: '',
  });

  const {
    name,
    species,
    breed,
    gender,
    bloodGroup,
    dateOfBirth,
    specialRemarks,
    customer,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      species: '',
      breed: '',
      gender: '',
      bloodGroup: '',
      dateOfBirth: '',
      specialRemarks: '',
      customer: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addAnimal({
      name,
      species,
      breed,
      gender,
      bloodGroup,
      dateOfBirth,
      specialRemarks,
      customer,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Alerts />
      <Animal />
      <Modal
        open={open}
        onClose={handleClose}
        style={{ height: '90vh', width: '40vw', margin: 'auto' }}
        aria-describedby="transition-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <div className="addModal">
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{ padding: '1rem' }}
            >
              <TextField
                name="name"
                size="small"
                label="Pet Name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <TextField
                name="species"
                size="small"
                label="Pet Type"
                value={species}
                onChange={(e) => onChange(e)}
                style={{ marginTop: '0.5rem' }}
                required
              />
              <TextField
                name="breed"
                label="Breed"
                size="small"
                value={breed}
                onChange={(e) => onChange(e)}
                style={{ marginTop: '0.5rem' }}
              />
              <FormLabel component="legend" style={{ marginTop: '0.5rem' }}>
                Gender
              </FormLabel>
              <RadioGroup
                name="gender"
                value={gender}
                row
                onChange={(e) => onChange(e)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {/*<TextField
                type="number"
                size="small"
                name="contact"
                label="Contact No"
                value={contact}
                onChange={(e) => onChange(e)}
                required
                minLength="10"
                style={{ marginTop: '0.5rem' }}
              />
               <TextField
                type="date"
                size="small"
                name="scheduleDate"
                label="Appointment Date"
                value={scheduleDate}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                style={{ marginTop: '0.6rem' }}
              />
              <TextField
                type="time"
                size="small"
                name="scheduleTime"
                label="Appointment Time"
                value={scheduleTime}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                style={{ marginTop: '0.6rem' }}
              />
              <TextField
                size="small"
                name="animal"
                label="Pet Animal Type and Name"
                value={animal}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                style={{ marginTop: '0.5rem' }}
              />
              <TextField
                size="small"
                name="remarks"
                label="Additional Remarks"
                value={remarks}
                onChange={(e) => onChange(e)}
                multiline
                rows={2}
                minLength="6"
                style={{ marginTop: '0.5rem' }}
              /> */}
            </Grid>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="center"
              style={{ padding: '1rem' }}
            >
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={resetForm}
                >
                  RESET
                </Button>
              </Grid>
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
      </Modal>
    </div>
  );
};

AddAnimal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addAnimal: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getAnimalTypes: PropTypes.func.isRequired,
};

export default connect(null, {
  setAlert,
  addAnimal,
  getCustomers,
  getAnimalTypes,
})(AddAnimal);
