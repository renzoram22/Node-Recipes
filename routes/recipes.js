const { Router } = require("express");
const { check } = require("express-validator");
const { storeRecipes, fetchRecipes } = require("../controllers/recipes");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/jwt-validator");

const router = Router();

router.put(
  "/",
  [
    check("*.name", "El nombre es obligatorio").not().isEmpty(),
    check("*.description", "La descripcion es obligatoria").not().isEmpty(),
    check("*.ingredients", "Debe ser objecto").isArray(),
    check("*.imagePath", "La imagen es requerida").not().isEmpty(),
    validarCampos,
  ],
  storeRecipes
);
router.get("/", [
  // validarJWT
], fetchRecipes);

module.exports = router;
