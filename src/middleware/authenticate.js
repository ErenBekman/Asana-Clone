const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const User = require(".././models/Users");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // const token = req.headers?.authorization?.split(" ")[1] || null
  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "please first you have to login" });
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({ error: err });
    req.user = await User.findById(user._doc._id);
    next();
  });
};

module.exports = authenticateToken;
