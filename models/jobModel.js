const mongoose = require("mongoose");

const Job = mongoose.model("Job", {
  campanyname: String,
  logourl: String,
  position: String,
  salary: Number,
  jobtype: Array,
  workplace: Array,
  location: String,
  jobdesc: String,
  aboutcampany: String,
  skills: Array,
});
module.exports = Job;
