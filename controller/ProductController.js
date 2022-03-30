const { Product } = require("../model");
const fs = require('fs');


exports.create = async (req, res) => {

    let image = './upload/' + Math.floor(Math.random() * 1000000000000000) + '.png';
    await fs.promises.writeFile(image, req.files.image[0].buffer)

    let data = req.body;
    const product = await Product.create({
      name: data.name,
      decsription: data.decsription,
      price: data.price,
      image : image,
      category_id : data.category_id
    });
    res.json(product);
  };

  exports.ById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);
      } catch (error) {
        res.status(400).send(error);
      }
  };

  exports.all = async (req, res) => {
    const product = await Product.findAll();
  
    res.json(product);
  };