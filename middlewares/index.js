const authenticateToken = require("./token/authenticateToken");
const authenticateTokenReg = require("./token/authenticateTokenreg");
const notFoundHandler = require("./P404/notFoundHandler");
const validateContentType = require("./contentType/validateContentType");
const verifyIp = require("./allowedIps/verifyIp");
module.exports = {
  authenticateToken,
  authenticateTokenReg,
  notFoundHandler,
  validateContentType,
  verifyIp,
};
