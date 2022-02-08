const Categories = require("../../models/Categories");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Categories.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find().populate("recipes");
    console.log(categories);
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    //   req.body.image = req.body.image.replace('\\', '/');
    // }
    const newCategories = await Categories.create(req.body);
    return res.status(201).json(newCategories);
  } catch (error) {
    next(error);
  }
};
