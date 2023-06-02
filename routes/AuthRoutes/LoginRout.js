const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const loginRoute = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      let matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        res.status(200).send({
          status: "success",
          message: "user loged in successfully",
        });
      } else {
        res
          .status(500)
          .send({ status: "failed", message: "password did't matched" });
      }
    } else {
      res
        .status(500)
        .send({ status: "failed", message: "this user is not registered" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "failed", message: "incorrect credentials" });
  }
};

module.exports = loginRoute;
