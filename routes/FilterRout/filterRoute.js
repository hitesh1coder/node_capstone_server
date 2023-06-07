const Job = require("../../models/jobModel");

const filterRoute = async (req, res) => {
  try {
    const skills = req.query.skills || "";

    const alljobs = await Job.find();
    const filterJobs = await Job.find({ skillsArray: { $in: [skills] } });

    res.status(200).json(skills === "" ? alljobs : filterJobs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = filterRoute;
