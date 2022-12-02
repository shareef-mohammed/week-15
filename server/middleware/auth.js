
const JWT = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  if (req.headers["x-custom-header"]) {
    try {
      user = req.headers["x-custom-header"];
      const decode = JWT.verify(user, "secret123");
        const type = decode.type;
        if (type === "user") {
            next();
          }
    } catch (err) {
      return res.status(200).send({ errormsg: "authentication failed" });
    }
  } else {
    return res.status(200).send({ errormsg: "authentication failed" });
  }
};
exports.authCheck = authCheck;

const validateAdminToken = async (req, res, next) => {
  if (req.headers["x-custom-header"]) {
    try {
      admin = req.headers["x-custom-header"];
      const decode = JWT.verify(admin, "secret456");
      
      const type = decode.type;
      if (type === "admin") {
        next();
      }
    } catch (err) {
      return res.status(200).send({ errormsg: "authentication failed" });
    }
  } else {
    return res.status(200).send({ errormsg: "authentication failed" });
  }
};

exports.validateAdminToken = validateAdminToken;