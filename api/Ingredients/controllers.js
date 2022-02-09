const Ingredient = require("../../models/Ingredients");
const Recipe = require("../../models/Recipes");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find().populate("recipes");
    return res.json(ingredients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newIngredient = await Ingredient.create(req.body);

    return res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
