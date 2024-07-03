const validateContentType = (req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res
      .status(415)
      .json({ error: "Content-Type must be application/json" });
  }
  if (
    req.method === "GET" &&
    !req.headers["accept"].includes("application/json")
  ) {
    return res.status(406).json({
      error: "El encabezado de aceptación debe incluir la aplicación/json",
    });
  }
  next();
};

module.exports = validateContentType;
