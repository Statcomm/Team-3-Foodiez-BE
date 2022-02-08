const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const recipesRoutes = require("./api/Recipes/routes");
const categoriesRoutes = require(`./api/Categories/routes`);
const ingredientsRoutes = require(`./api/Ingredients/routes`);

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/recipes", recipesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/ingredients", ingredientsRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT || 5000);
