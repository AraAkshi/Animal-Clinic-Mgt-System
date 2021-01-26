const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

//Connect DB
connectDB();

//Init Middleware - enables body-parser which is default in express
app.use(
  "/uploads",
  express.static(path.join(__dirname, "routes", "api", "uploads"))
);
app.use(express.json({ extended: false })); //extended: false- allows us to use req object

//Define Routes
app.use("/api/customer", require("./routes/customer"));
app.use("/api/animal", require("./routes/animal"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/employee", require("./routes/employee"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/productCategory", require("./routes/productCategory"));
app.use("/api/user", require("./routes/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));
