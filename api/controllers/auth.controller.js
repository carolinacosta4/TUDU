const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");

exports.verifyToken = (req, res, next) => {
  console.log('WHYYYYYYYYYYY')
  console.log('hola en el verify token')
  console.log('inside verify token', req.headers);
  const header = req.headers["x-access-token"] || req.headers.authorization;
  console.log('Header:', header);  
  if (typeof header == "undefined")
    return res
      .status(401)
      .json({
        success: false,
        msg: "Invalid token or no token at all. Please log in again.",
      });
  const bearer = header.split(" ");
  const token = bearer[1];
  try {
    let decoded = jwt.verify(token, config.SECRET);
    req.loggedUserId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Unauthorized!" });
  }
};
