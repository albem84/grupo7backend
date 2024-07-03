const allowedIps = ["192.168.0.3"];

const verifyIp = (req, res, next) => {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (allowedIps.includes(clientIp)) {
    next();
  } else {
    res.status(403).json({ error: "Acceso denegado" }); // La IP no está permitida, enviar error
  }
};

module.exports = verifyIp;
