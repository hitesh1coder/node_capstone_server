const Job = require("../../models/jobModel");

const filterRoute = async (req, res) => {
  try {
    let skills = req.query.skills.split(",") || [];

    if (skills.includes("")) {
      skills.splice(0, 2);
    }

    if (skills.length < 1) {
      const alljobs = await Job.find();
      return res.status(200).json(alljobs);
    } else {
      const filterJobs = await Job.find({
        skillsArray: { $in: [...skills] },
      });
      res.status(200).json(filterJobs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = filterRoute;
