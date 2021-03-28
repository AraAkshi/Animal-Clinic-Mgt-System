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
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import { getAllCustomers } from '../../../../services/customer';
import CustomerDetails from './CustomerDetails';
import Alerts from '../../../layout/Alerts';
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

function Customer() {
  const [alert, setAlert] = useState([]);
  const [customers, setCustomers] = useState([
    {
      id: 0,
      isActive: true,
      name: '',
      email: '',
      address: '',
      contact: 0,
      enteredDate: '',
    },
  ]);
  const [customerAnimals, setCustomerAnimals] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: 0,
    isActive: true,
    name: '',
    email: '',
    address: '',
    contact: 0,
    enteredDate: '',
  });

  const addCustomer = () => {
    window.open(
      window.location.origin + '/admin/customers/add-customer',
      '_self'
    );
  };

  const handleRowSelect = async (item) => {
    setSelectedCustomer(item);
    const animalRes = await getCusAnimals(item.id);
    if (animalRes !== undefined) setCustomerAnimals(animalRes);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllCustomers();
      if (res !== undefined) {
        setCustomers(res);
      }
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
                  Total Registered Customers
                </Typography>
              </Grid>
              <Grid item>
                <div className="petStatCard">{customers.length}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={addCustomer}
              variant="contained"
              style={{ margin: '0.5rem' }}
            >
              New Customer
            </Button>
          </Grid>
        </Grid>
        <hr className="seperatorLine" />
        <Grid container direction="row" justify="space-between">
          <Grid item xs={7}>
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader style={{ maxHeight: '70vh' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Contact</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.length > 0 ? (
                    customers.map((item) => (
                      <TableRow
                        hover={true}
                        onClick={() => handleRowSelect(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{item.contact}</StyledTableCell>
                        <StyledTableCell>{item.email}</StyledTableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <StyledTableCell>No Customers</StyledTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
            <CustomerDetails
              selectedCustomer={selectedCustomer}
              customerAnimals={customerAnimals}
              setAlert={setAlert}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Customer;
