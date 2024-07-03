const jwt = require("jsonwebtoken");
const authenticateTokenReg = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const verified = jwt.verify(token, process.env.REG_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ error: "Token inválido", status: false });
  }
};
module.exports = authenticateTokenReg;
