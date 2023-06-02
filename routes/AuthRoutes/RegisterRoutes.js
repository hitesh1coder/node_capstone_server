const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const registerRotes = async (req, res) => {
  const { name, email, mobile, password, terms } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.send({ status: "failed", message: "user already exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: encryptedPassword,
      mobile,
      terms,
    });

    return res.send({
      status: "success",
      massage: "register successful",
      user: user,
    });
  } catch (error) {
    res.send({ error: error });
  }
};
module.exports = registerRotes;
