// import sequelize & schemas
const Sequelize = require("sequelize");
const db = require("../config/database");
const UserModel = require("./User");
const ProductModel = require("./Product");
const CategoryModel = require("./Category");
const CommandModel = require("./Command");
const CommandProductModel = require("./CommandProduct");
const FactureModel = require("./Facture");


// Gen Model in database
const User = UserModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Command = CommandModel(db, Sequelize);
const CommandProduct = CommandProductModel(db, Sequelize);
const Facture = FactureModel(db, Sequelize);


// les relaction

// relation between category//product one to many

Category.hasMany(
  Product,

  { foreignKey: "category_id" }
);

Product.belongsTo(
  Category,

  { as: "category", foreignKey: "category_id" }
);

// relation between User //  commanede onevto many

User.hasMany(Command, { foreignKey: "client_id" });

Command.belongsTo(User, { as: "client", foreignKey: "client_id" });

User.hasMany(Command, { foreignKey: "delivery_id" });

Command.belongsTo(User, { as: "delivery", foreignKey: "delivery_id" });

// relation between product //  commande many to many

Product.belongsToMany(Command, {
  through: CommandProduct,
  as: "commands",
  foreignKey: "product_id",
});

Command.belongsToMany(Product, {
  through: CommandProduct,
  as: "products",
  foreignKey: "command_id",
});
// relation between command // facture 1 to 1

Facture.belongsTo(Command);
Command.hasOne(Facture);

// Create table of model
db.sync({ force: false }).then(() => {
  console.log("Table Created !");
});

module.exports = {
  User,
  Product,
  Category,
  Command,
  CommandProduct,
  Facture,
};
