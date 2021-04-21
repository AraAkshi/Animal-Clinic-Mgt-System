import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import { getSalesByDate } from '../../../../services/sales';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { formatDate } from '../../../../services/appointment';
import { reportTypes } from '../../../../services/datasets/report-types.d';
import SaleReportTemplate from './SaleReportTemplate';

function Report() {
  const d = new Date();
  const date = formatDate(d);
  const [StartDate, setStartDate] = useState(date);
  const [EndDate, setEndDate] = useState(date);
  const [reportType, setReportType] = useState();
  const [loading, setLoading] = useState(null);
  const [salesData, setSalesData] = useState([]);
  //Set start date
  const onStartDateSelect = (e) => {
    setStartDate(e.target.value);
  };

  //Set end date
  const onEndDateSelect = (e) => {
    setEndDate(e.target.value);
  };

  //Set report type
  const onReportTypeSelect = (e) => {
    setReportType(e.target.value);
  };

  //Get report data
  const getReportData = async () => {
    setLoading(false);
    const res = await getSalesByDate(StartDate, EndDate);
    if (res !== undefined) setSalesData(res);
    setLoading(true);
  };

  const componentRef = useRef();

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
        >
          <Grid item>
            <TextField
              label="Start Date"
              variant="outlined"
              type="date"
              size="small"
              name="startDate"
              value={StartDate}
              style={{ backgroundColor: '#fff', borderRadius: '0.2rem' }}
              onChange={(e) => onStartDateSelect(e)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="End Date"
              variant="outlined"
              type="date"
              size="small"
              name="EndDate"
              value={EndDate}
              style={{ backgroundColor: '#fff', borderRadius: '0.2rem' }}
              onChange={(e) => onEndDateSelect(e)}
            />
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              size="small"
              style={{
                backgroundColor: '#fff',
                width: '15vw',
                borderRadius: '0.2rem',
                fontSize: '1vw',
              }}
            >
              <InputLabel id="reportLabel">Report Type</InputLabel>
              <Select
                labelId="reportLabel"
                value={reportType}
                onChange={(e) => onReportTypeSelect(e)}
              >
                {reportTypes.length > 0 ? (
                  reportTypes.map((item) => (
                    <MenuItem key={item.id} value={item.type}>
                      {item.type}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No Report Types</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={getReportData}
              endIcon={
                loading === false ? (
                  <CircularProgress size="1rem" />
                ) : loading === true ? (
                  <CheckCircleOutlineOutlinedIcon />
                ) : (
                  true
                )
              }
            >
              Get Report
            </Button>
          </Grid>
        </Grid>
        <ReactToPrint
          trigger={() => (
            <Button size="small" variant="contained" color="secondary">
              Download
            </Button>
          )}
          content={() => componentRef.current}
        />
        <SaleReportTemplate ref={componentRef} salesData={salesData} />
      </div>
    </div>
  );
}

export default Report;
