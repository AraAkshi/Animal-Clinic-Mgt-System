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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../../../../services/customer';
import { formatDate } from '../../../../services/appointment';
import { getAllTreatments } from '../../../../services/treatment';
import Header from '../../layout/Header';
import Alerts from '../../../layout/Alerts';
import Sidebar from '../../layout/Sidebar';
import TreatmentDetails from './TreatmentDetails';
import { getCategoryItems } from '../../../../services/inventory';

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
  const [alert, setAlert] = useState([]);
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
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
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

  const addTreatment = () => {
    window.open(
      window.location.origin + '/admin/treatments/add-treatment',
      '_self'
    );
  };

  const handleRowSelect = (item) => {
    setSelectedTreatment(item);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllTreatments();
      if (res !== undefined) setTreatments(res);

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
                <div className="petStatCard">{treatments.length}</div>
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
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader style={{ maxHeight: '70vh' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell>Animal</StyledTableCell>
                    <StyledTableCell>Treatment Type</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatments.length > 0 ? (
                    treatments.map((item) => (
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
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Treatment;
