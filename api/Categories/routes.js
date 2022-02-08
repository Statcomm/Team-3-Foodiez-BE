const express = require("express");

const { getCategory, categoryCreate, fetchCategory } = require("./controllers");

const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  constcategory = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("Category Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getCategory);
router.post("/createcat", categoryCreate);
module.exports = router;
