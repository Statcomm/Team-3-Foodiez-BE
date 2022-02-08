const express = require("express");

const { getRecipes, recipeCreate, fetchRecipe } = require("./controllers");
const upload = require("../../middleware/multer");
const router = express.Router();

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    const err = new Error("Recipe Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getRecipes);
router.post("/createRecipe", upload.single("image"), recipeCreate);

module.exports = router;
