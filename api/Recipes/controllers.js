const Recipe = require("../../models/Recipes");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("ingredients");
    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newRecipe = await Recipe.create(req.body);
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
