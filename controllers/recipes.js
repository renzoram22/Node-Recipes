const { response } = require("express");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const { validarJWT } = require("../middlewares/jwt-validator");

const storeRecipes = async (req, res = response) => {
  const recipes = req.body;
  const uid = await validarJWT(req, res);
  const { email } = await User.findById(uid);
  try {
    const deleteAll = await Recipe.deleteMany({ userEmail: email });
    recipes.forEach(async (recipe) => {
      recipe.userEmail = email;
      let newRecipe = new Recipe(recipe);
      await newRecipe.save();
    });

    res.status(200).json({
      msg: `Recetas borradas`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const fetchRecipes = async (req = request, res = response) => {
  const uid = await validarJWT(req, res);
  const { email } = await User.findById(uid);
  try {
    const recipes = await Recipe.find({ userEmail: email });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  storeRecipes,
  fetchRecipes,
};
