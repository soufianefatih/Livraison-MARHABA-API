const { Command, CommandProduct } = require("../model");

exports.create = async (req, res) => {
  let data = req.body;
  console.log(data);

  const command = await Command.create({
    address: data.address,
    phone: data.phone,
    total: 0,
    status: 0,
    user: req.user.id,
    client_id: data.client_id,
  });

  data.command_products.forEach(async (product) => {
    console.log("-----------srt------------");
    // console.log("product : ", product);
    // console.log("command : ", command.id);
    try {
      await CommandProduct.create({
        quantity: product.qty,
        price: product.price,
        total: product.qty * product.price,
        command_id: command.id,
        product_id: product.id,
      });
    } catch (error) {
      console.log("error : ", error);
    }
  });

  res.json({
    command: command,
  });
};

exports.all = async (req, res) => {
  const command = await Command.findAll();

  res.json(command);
};


exports.ById = async (req, res) => {
  try {
      const command = await Command.findByPk(req.params.id);
  
      res.json(command);
    } catch (error) {
      res.status(400).send(error);
    }
};