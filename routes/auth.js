const { signup, login } = require("../controllers/auth");
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/signup",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
