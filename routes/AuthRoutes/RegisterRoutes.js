const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const registerRoute = async (req, res) => {
  const { name, email, mobile, password, terms } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.send({
        status: "failed",
        message: "this email user already exists",
      });
    }
    if (name && email && mobile && password && terms) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
        mobile,
        terms,
      });
      const jwtToken = jwt.sign(
        { email, encryptedPassword },
        process.env.JWT_SECRECT_KEY,
        {
          expiresIn: 6000,
        }
      );
      return res.send({
        status: "success",
        message: "register successful",
        recruiterName: user.name,
        token: jwtToken,
      });
    } else {
      res.send({ status: "FAIL", message: "all fields require" });
    }
  } catch (error) {
    res.status(500).send({ status: "FAIL", message: "someting went wrong" });
  }
};
module.exports = registerRoute;
