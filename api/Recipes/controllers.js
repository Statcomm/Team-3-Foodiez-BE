const Recipe = require("../../models/Recipes");
const Category = require("../../models/Categories");
const { findById } = require("../../models/Recipes");

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
    const recipes = await Recipe.find()
      .populate("ingredients")
      .populate("categories");
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
    req.body.categories.map(
      async (categoryID) =>
        await Category.findOneAndUpdate(
          { _id: categoryID }, //FE needs to name this "categories"
          { $push: { recipes: newRecipe._id } }
        )
    );
    req.body.ingredients.map(
      async (ingredientID) =>
        await Recipe.findOneAndUpdate(
          { _id: ingredientID }, //FE needs to name this "categories"
          { $push: { recipes: newRecipe._id } }
        )
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

//create recipe
//recipe to be part of a category in model ref: "Recipe"
//req.body.categories is an array of ids
//for each id, update/push a new recipe
//for each category, category must be informed it has a new recipe id to intake
