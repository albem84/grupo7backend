const { check } = require("express-validator");
const UserRequest = [
  check("firstname")
    .isAlpha()
    .withMessage("El nombre solo debe contener letras")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  check("lastname")
    .isAlpha()
    .withMessage("El apellido solo debe contener letras")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),
  check("email")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  check("terminos")
    .equals("on")
    .withMessage("Debe aceptar los términos y condiciones")
    .notEmpty()
    .withMessage("El campo términos es obligatorio"),
];
module.exports = UserRequest;
