const { Category,Product } = require("../model");
const fs = require('fs');

/* -------create category by admin ----- */


exports.create = async (req, res) => {

  let image = './upload/' + Math.floor(Math.random() * 1000000000000000) + '.png';
  await fs.promises.writeFile(image, req.files.image[0].buffer)


    let data = req.body;
    const category = await Category.create({
      name: data.name,
      image : image,
    
    });
    res.json(category);
  };

/* -------update category by admin ----- */


  exports.update = async (req, res) => {
    let data = req.body;
    const category = await Category.update(
      {
        name: data.name,
      
      },
      { where: { id: req.params.id } }
    );
  
          res.status(200).send({message: 'update successfully ',category});

  
  };

/* -------get all category ----- */

  exports.all = async (req, res) => {
    const categorys = await Category.findAll();
  
    res.json(categorys);
  };

/* -------delete category by admin ----- */


  exports.delete = async (req, res) => {

    try {
        const category = await Category.destroy({where: { id: req.params.id}});

        res.status(200).send({message: 'delete successfully ',category});

    } catch (error) {
        res.status(400).send(error);
    }
}


/* -------get one category  ----- */


exports.ById = async (req, res) => {
  try {
      const category = await Category.findByPk(req.params.id);
  
      res.json(category);
    } catch (error) {
      res.status(400).send(error);
    }
};


/* -------get category with info product ----- */

exports.product = async (req, res) => {
  const id = req.params.id
  try {
      const category = await Category.findOne({
        include: [{
            model: Product,
            as: 'products'
        }],
        where: {id: id}
    });
      res.json(category);
    } catch (error) {
      res.status(400).send(error);
    }
};