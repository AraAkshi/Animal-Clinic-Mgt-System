import {
  Backdrop,
  Modal,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useState, useEffect } from 'react';
import { setAlert } from '../../../../actions/alerts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAnimal } from '../../../../actions/animal';
import Alerts from '../../../layout/Alerts';
import Animal from './Animal';
import { getCustomers } from '../../../../actions/customer';
import { getAnimalTypes } from '../../../../actions/animalType';

const AddAnimal = ({
  petTypes,
  customer,
  setAlert,
  addAnimal,
  getCustomers,
  getAnimalTypes,
}) => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    bloodGroup: '',
    dateOfBirth: '2021-02-28',
    remarks: '',
    owner: '',
  });

  const {
    name,
    species,
    breed,
    gender,
    bloodGroup,
    dateOfBirth,
    remarks,
    owner,
  } = formData;

  useEffect(() => {
    async function fetchData() {
      await getCustomers();
      await getAnimalTypes();
    }
    fetchData();
  }, [0]);

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
      dateOfBirth: '2021-02-28',
      remarks: '',
      owner: '',
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
      remarks,
      owner,
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
              <InputLabel id="petName">Pet Type</InputLabel>
              <Select
                labelId="petName"
                name="species"
                value={species}
                onChange={(e) => onChange(e)}
                required
              >
                {petTypes.animalTypes.length > 0 ? (
                  petTypes.animalTypes.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No Pet Types</MenuItem>
                )}
              </Select>
              <TextField
                name="name"
                size="small"
                label="Pet Name"
                value={name}
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
                required
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
              </RadioGroup>
              <TextField
                name="bloodGroup"
                label="Blood Group"
                size="small"
                value={bloodGroup}
                onChange={(e) => onChange(e)}
                style={{ marginTop: '0.5rem' }}
              />
              <TextField
                type="date"
                size="small"
                name="dateOfBirth"
                label="Date of Birth"
                value={dateOfBirth}
                inputProps={{
                  min: `${new Date().toISOString().split('T')[0]}`,
                }}
                onChange={(e) => onChange(e)}
                style={{ marginTop: '0.5rem' }}
              />
              <InputLabel id="customer" style={{ marginTop: '0.5rem' }}>
                Customer Name
              </InputLabel>
              <Select
                labelId="customer"
                name="customer"
                value={owner}
                onChange={(e) => onChange(e)}
                required
              >
                {customer.customers.length > 0 ? (
                  customer.customers.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No Customers</MenuItem>
                )}
              </Select>
              <TextField
                name="remarks"
                label="Remarks"
                size="small"
                value={remarks}
                onChange={(e) => onChange(e)}
                style={{ marginTop: '0.5rem' }}
              />
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  animalType: state.animalType,
  customer: state.customer,
});

export default connect(mapStateToProps, {
  setAlert,
  addAnimal,
  getCustomers,
  getAnimalTypes,
})(AddAnimal);
