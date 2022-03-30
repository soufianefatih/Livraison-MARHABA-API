// import sequelize & schemas
const Sequelize = require("sequelize");
const db = require("../config/database");
const UserModel = require("./User");
const ProductModel = require("./Product");
const CategoryModel = require("./Category");

// Gen Model in database
const User = UserModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);

// les relaction

Category.hasMany(
  Product,

  { foreignKey: "category_id" }
);

Product.belongsTo(
  Category,

  { as: "category", foreignKey: "category_id" }
);

// Create table of model
db.sync({ force: false }).then(() => {
  console.log("Table Created !");
});

module.exports = {
  User,
  Product,
  Category,
};
