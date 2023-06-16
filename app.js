const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/jobModel");
const healthcheck = require("./routes/helthchecker");
const registerRoute = require("./routes/AuthRoutes/RegisterRoutes");
const loginRoute = require("./routes/AuthRoutes/LoginRout");
const addjobroutes = require("./routes/AddJobRout/AddJobRout");
const filterRoute = require("./routes/FilterRout/filterRoute");
const jobdetailes = require("./routes/JobDetailsRouts/getjobdetails");
const authUser = require("./middleware/authmiddleware");
const editjobroutes = require("./routes/EditJobRout/editjobroute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use("/healthcheck", healthcheck);

app.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// routes
app.post("/register", registerRoute);
app.post("/login", loginRoute);
app.post("/add-job", addjobroutes);
app.get("/jobs", filterRoute);
app.get("/job/:id", jobdetailes);
app.put("/job/:id", editjobroutes);

// Error Handling middlewere
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Server running on port ${port} and DB connected`);
    })
    .catch((err) => console.log("connection error: " + err));
});
