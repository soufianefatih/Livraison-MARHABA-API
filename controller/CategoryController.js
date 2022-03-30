const { Category,Product } = require("../model");

exports.create = async (req, res) => {
    let data = req.body;
    const category = await Category.create({
      name: data.name,
    
    });
    res.json(category);
  };


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

  exports.all = async (req, res) => {
    const categorys = await Category.findAll();
  
    res.json(categorys);
  };

  exports.delete = async (req, res) => {

    try {
        const category = await Category.destroy({where: { id: req.params.id}});

        res.status(200).send({message: 'delete successfully ',category});

    } catch (error) {
        res.status(400).send(error);
    }
}

exports.ById = async (req, res) => {
  try {
      const category = await Category.findByPk(req.params.id);
  
      res.json(category);
    } catch (error) {
      res.status(400).send(error);
    }
};



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