const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const verified = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ error: "Token inválido", status: false });
  }
};
module.exports = authenticateToken;
