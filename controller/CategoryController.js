const { Category } = require("../model");

exports.create = async (req, res) => {
    let data = req.body;
    const category = await Category.create({
      name: data.name,
    
    });
    res.json(category);
  };