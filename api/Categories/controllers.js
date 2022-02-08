const Category = require("../../models/Categories");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find().populate("recipes");
    console.log(category);
    return res.json(category);
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
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
