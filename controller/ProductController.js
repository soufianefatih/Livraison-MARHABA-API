const { Product } = require("../model");
const fs = require('fs');

/* -------create product by admin ----- */

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

/* -------get one product ----- */


  exports.ById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);
      } catch (error) {
        res.status(400).send(error);
      }
  };

/* -------get all products ----- */


  exports.all = async (req, res) => {
    const product = await Product.findAll();
  
    res.json(product);
  };


/* -------delete product by admin ----- */

  exports.delete = async (req, res) => {

    try {
        const product = await Product.destroy({where: { id: req.params.id}});

        res.status(200).send({message: 'delete successfully ',product});

    } catch (error) {
        res.status(400).send(error);
    }
}

/* -------update product by admin ----- */

exports.update = async (req, res) => {
    let data = req.body;
    const product = await Product.update(
      {
        name: data.name,
        decsription: data.decsription,
        price: data.price,
      
      },
      { where: { id: req.params.id } }
    );
  
          res.status(200).send({message: 'update successfully ',product});

  
  };