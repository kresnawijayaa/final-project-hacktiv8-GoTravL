const { verifyToken } = require("../helpers");

const Authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "WrongToken", message: "Invalid token" };
    }
    const verify = verifyToken(access_token);
    if (!verify) {
      throw { name: "WrongToken", message: "Invalid token" };
    }
    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

const ErrorHandler = (error, req, res, next) => {
  console.log(error.message);
  switch (error.name) {
    case "WrongToken":
      return res.status(403).json({
        message: error.message,
      });
    case "BlankForm":
      return res.status(403).json({
        message: error.message,
      });
    case "Unauthorized":
      return res.status(401).json({
        message: error.message,
      });
    case "JsonWebTokenError":
      return res.status(400).json({
        message: error.message,
      });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({
        message: error.message,
      });
    case "SequelizeValidationError":
      return res.status(400).json({
        message: error.message
          .replace("Validation error: ", "")
          .replace("notNull Violation: ", ""),
      });
    case "NotFound":
      return res.status(404).json({
        message: "Data not found",
      });
    case "BadRequest":
      return res.status(403).json({
        message: error.message,
      });
    default:
      return res.status(500).json({
        message: "Internal Server Error",
      });
  }
};

module.exports = { Authentication, ErrorHandler };
