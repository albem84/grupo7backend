const notFoundHandler = (req, res, next) => {
  const error = {
    error: "Ruta no encontrada",
    message: `La ruta ${req.originalUrl} no existe en este servidor.`,
  };
  res.status(404).json(error);
};
module.exports = notFoundHandler;
