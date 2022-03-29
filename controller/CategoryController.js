const { Category } = require("../model");

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
  
    // res.json(category);
          res.status(200).send({message: 'update successfully ',category});

  
  };