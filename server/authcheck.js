let jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  } else {
    return res.json({
      success: false,
      message: "Authentication invalid.",
    });
  }

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Authentication token is not valid",
        });
      } else {
        req.decoded = decoded;
        req.body.id = decoded._id;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Authentication token was not supplied",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};