const mongoose = require("mongoose");

const Job = mongoose.model("Job", {
  campanyname: String,
  logourl: String,
  position: String,
  salary: Number,
  jobtype: String,
  workplace: String,
  location: String,
  jobdesc: String,
  aboutcampany: String,
  skillsArray: [],
});
module.exports = Job;
