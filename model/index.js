// import sequelize & schemas
const Sequelize = require("sequelize");
const db = require("../config/database");
const UserModel = require("./User");
const ProductModel = require("./Product");
const CategoryModel = require("./Category");
const CommandModel = require("./Command");


// Gen Model in database
const User = UserModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Command = CommandModel(db, Sequelize);


// les relaction

// relation between category//product

Category.hasMany(
  Product,

  { foreignKey: "category_id" }
);

Product.belongsTo(
  Category,

  { as: "category", foreignKey: "category_id" }
);

// relation between User //  commanede


User.hasMany(
    Command, 
    { foreignKey: 'client_id' }
    );

User.hasMany(
    Command,
     { foreignKey: 'delivery_id' }
     );
Command.belongsTo(
    User,
     { as: 'client', foreignKey: 'client_id' }
    );
Command.belongsTo(
    User,
     { as: 'delivery', foreignKey: 'delivery_id' }
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
