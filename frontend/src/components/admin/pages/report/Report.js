import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
} from '@material-ui/core';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import { getSalesByDate } from '../../../../services/sales';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { formatDate } from '../../../../services/appointment';
// import Select from 'react-select';
import { reportTypes } from '../../../../services/datasets/report-types.d';

function Report() {
  const d = new Date();
  const date = formatDate(d);
  const [StartDate, setStartDate] = useState(date);
  const [EndDate, setEndDate] = useState(date);
  const [reportType, setReportType] = useState('');
  const [loading, setLoading] = useState(null);

  const onStartDateSelect = (e) => {
    setStartDate(e.target.value);
  };

  const onEndDateSelect = (e) => {
    setEndDate(e.target.value);
  };

  const getReportData = async () => {
    setLoading(false);
    const res = await getSalesByDate(StartDate, EndDate);
    setLoading(true);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          style={{ marginTop: '0.5rem' }}
        >
          <Grid item>
            <TextField
              label="Start Date"
              variant="outlined"
              type="date"
              size="small"
              name="startDate"
              value={StartDate}
              style={{ backgroundColor: '#fff' }}
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
              style={{ backgroundColor: '#fff' }}
              onChange={(e) => onEndDateSelect(e)}
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              // labelId='petName'
              name="type"
              value={reportType}
              // onChange={(e) => onChange(e)}
              required
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
            {/* <Select options={options} label='Report Type' /> */}
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
      </div>
    </div>
  );
}

export default Report;
