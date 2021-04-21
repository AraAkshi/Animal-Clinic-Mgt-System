import {
  TableContainer,
  Paper,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Button,
  TableBody,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../../../../services/customer';
import { formatDate } from '../../../../services/appointment';
import { getAllTreatments } from '../../../../services/treatment';
import Header from '../../layout/Header';
import Alerts from '../../../client/layout/Alerts';
import Sidebar from '../../layout/Sidebar';
import TreatmentDetails from './TreatmentDetails';
import { getCategoryItems, getOneItem } from '../../../../services/inventory';
import { getCusAnimals } from '../../../../services/animal';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

function Treatment() {
  const d = new Date();
  const date = formatDate(d);
  const [alert, setAlert] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [treatments, setTreatments] = useState([
    {
      id: 0,
      treatmentType: '',
      customer: { name: '', id: '', contact: '' },
      animal: { name: '', breed: '', id: '' },
      itemsUsed: [],
      description: '',
      dateReceived: '',
      timeReceived: '',
      nextTreatmentDate: '',
    },
  ]);
  const [todayTreatments, setTodayTreatments] = useState([
    {
      id: 0,
      treatmentType: '',
      customer: { name: '', id: '', contact: '' },
      animal: { name: '', breed: '', id: '' },
      itemsUsed: [],
      description: '',
      dateReceived: '',
      timeReceived: '',
      nextTreatmentDate: '',
    },
  ]);
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cusAnimals, setCusAnimals] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState({
    id: 0,
    treatmentType: '',
    customer: { name: '', id: '', contact: '' },
    animal: { name: '', breed: '', id: '' },
    itemsUsed: [],
    description: '',
    dateReceived: '',
    timeReceived: '',
    nextTreatmentDate: '',
  });

  //Get treatments of selected date
  const onChange = (e) => {
    setSelectedDate(e.target.value);
    const todayTreatments = treatments.filter((item) => {
      if (formatDate(item.dateReceived) === e.target.value) return item;
    });
    setTodayTreatments(todayTreatments);
  };

  //Add Treatment
  const addTreatment = () => {
    window.open(
      window.location.origin + '/admin/treatments/add-treatment',
      '_self'
    );
  };

  const handleRowSelect = async (item) => {
    //Get Items used treatment
    const items = [];
    for (let i in item.itemsUsed) {
      const treatmentDetails = item.itemsUsed[i].split('-');
      const treatmentId = treatmentDetails[0];
      const treatmentQty = treatmentDetails[1];
      const treatmentRes = await getOneItem(treatmentId);
      if (treatmentRes !== undefined) {
        items.push(Object.assign(treatmentRes, { usedQty: treatmentQty }));
      }
    }
    item.itemsUsed = items;
    setSelectedTreatment(item);
    //Get Animals of the Customer
    const animalRes = await getCusAnimals(item.customer.id);
    if (animalRes !== undefined) setCusAnimals(animalRes);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllTreatments();
      if (res !== undefined) {
        setTreatments(res);
        const todayTreatments = res.filter(
          (item) => formatDate(item.dateReceived) === selectedDate
        );
        setTodayTreatments(todayTreatments);
      }

      const customerRes = await getAllCustomers();
      if (customerRes !== undefined) setCustomers(customerRes);

      const itemsRes = await getCategoryItems(1);
      if (itemsRes !== undefined) setItems(itemsRes);
    }
    fetchData();
  }, [0]);

  return (
    <div>
      <Alerts alerts={alert} />
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Grid container direction="row" alignContent="center">
              <Grid item>
                <Typography variant="body1" style={{ paddingTop: '0.81rem' }}>
                  Total Treatments
                </Typography>
              </Grid>
              <Grid item>
                <div className="petStatCard">{todayTreatments.length}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={addTreatment}
              variant="contained"
              style={{ margin: '0.5rem' }}
            >
              New Treatment
            </Button>
          </Grid>
        </Grid>
        <hr className="seperatorLine" />
        <Grid container direction="row" justify="space-between">
          <Grid item xs={6}>
            <Grid container direction="row" justif="flex-start" spacing={2}>
              <Grid item>
                <Typography variant="subtitle2">Select Date: </Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="date"
                  size="small"
                  name="selectedDate"
                  value={selectedDate}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
            </Grid>
            <TableContainer
              component={Paper}
              style={{
                marginTop: '0.5rem',
                maxHeight: '70vh',
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell>Animal</StyledTableCell>
                    <StyledTableCell>Treatment Type</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayTreatments.length > 0 ? (
                    todayTreatments.map((item) => (
                      <TableRow
                        key={item.id}
                        hover={true}
                        onClick={() => handleRowSelect(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <StyledTableCell>
                          {formatDate(item.dateReceived)}
                        </StyledTableCell>
                        <StyledTableCell>{item.customer.name}</StyledTableCell>
                        <StyledTableCell>{item.animal.name}</StyledTableCell>
                        <StyledTableCell>{item.treatmentType}</StyledTableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <StyledTableCell>No Treatments</StyledTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <TreatmentDetails
              selectedTreatment={selectedTreatment}
              setAlert={setAlert}
              customers={customers}
              items={items}
              cusAnimals={cusAnimals}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Treatment;
