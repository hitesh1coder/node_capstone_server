const jwt = require("jsonwebtoken");
const Job = require("../../models/jobModel");

const EditJobController = async (req, res) => {
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
  } = req.body;
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);

    if (decoded) {
      const id = req.params.id;
      const updatejob = await Job.findByIdAndUpdate(id, {
        campanyname: campanyname || req.body.campanyname,
        logourl: logourl || req.body.logourl,
        position: position || req.body.position,
        salary: salary || req.body.salary,
        jobtype: jobtype || req.body.jobtype,
        workplace: workplace || req.body.workplace,
        location: location || req.body.location,
        jobdesc: jobdesc || req.body.jobdesc,
        aboutcampany: aboutcampany || req.body.aboutcampany,
      });

      res
        .status(201)
        .json({ message: "Successfully Updated", data: updatejob });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "You are not Authorised user! Login again ", error });
  }
};

module.exports = EditJobController;
