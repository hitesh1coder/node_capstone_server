const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/jobModel");
const healthcheck = require("./routes/helthchecker");
const RegisterController = require("./controller/AuthController/RegisterController");
const LoginController = require("./controller/AuthController/LoginController");
const AddjobController = require("./controller/AddJobController/AddjobController");
const FilterJobController = require("./controller/FilterController/FilterJobController");
const GetJobDetailController = require("./controller/JobDetailsController/GetJobDetailController");
const EditJobController = require("./controller/EditJobController/EditJobController");
const auth = require("./middleware/authmiddleware");

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
app.post("/register", RegisterController);
app.post("/login", LoginController);
app.post("/add-job", AddjobController);
app.get("/jobs", FilterJobController);
app.get("/job/:id", GetJobDetailController);
app.put("/job/:id", EditJobController);

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
mongoose
  .connect(process.env.MONGODB_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => console.log("connection error: " + err));
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
