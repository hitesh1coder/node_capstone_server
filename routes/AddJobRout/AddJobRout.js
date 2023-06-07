const jwt = require("jsonwebtoken");
const Job = require("../../models/jobModel");

const addjobroutes = async (req, res) => {
  const {
    campanyname,
    logourl,
    position,
    salary,
    jobtype,
    workplace,
    location,
    jobdesc,
    aboutcampany,
    skills,
  } = req.body;
  const skillsArray = skills.split(",");
  try {
    if (
      !campanyname ||
      !logourl ||
      !position ||
      !salary ||
      !jobtype ||
      !workplace ||
      !location ||
      !jobdesc ||
      !aboutcampany ||
      !skillsArray.length < 0
    ) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    // checking user is logged in or not
    // middleware
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    const id = decoded.id;

    const job = await Job.create({
      id,
      campanyname,
      logourl,
      position,
      salary,
      jobtype,
      workplace,
      location,
      jobdesc,
      aboutcampany,
      skillsArray,
    });
    res.status(201).json({ message: "SUCCESS", job });
  } catch (error) {
    res.status(500).json({ message: "Please login first", error });
  }
};

module.exports = addjobroutes;
