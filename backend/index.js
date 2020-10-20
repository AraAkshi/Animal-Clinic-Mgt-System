const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect DB
connectDB();

//Init Middleware - enables body-parser which is default in express
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'routes', 'api', 'uploads'))
);
app.use(express.json({ extended: false })); //extended: false- allows us to use req object

//Define Routes
// app.use('/api/customers', require('./routes/api/onlineCustomers'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));