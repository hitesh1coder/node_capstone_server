const Job = require("../../models/jobModel");

const GetJobDetailController = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id);
  res.status(200).json(job);
};

module.exports = GetJobDetailController;
