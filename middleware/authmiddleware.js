const jwt = require("express");

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(200).send({ success: false, msg: "a token is required" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);

      req.user = decoded;
    } catch (error) {
      return res
        .status(400)
        .send({ msg: "you must have register or login first" });
    }
    return next();
  }
};
module.exports = verifyToken;
