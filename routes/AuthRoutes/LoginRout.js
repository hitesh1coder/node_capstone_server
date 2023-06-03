const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const loginRoute = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      let matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRECT_KEY, {
          expiresIn: 6000,
        });
        res.status(200).send({
          status: "success",
          message: "user loged in successfully",
          token: jwtToken,
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
