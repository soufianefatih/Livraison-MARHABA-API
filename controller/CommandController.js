const { Command , CommandProduct } = require("../model");


exports.create = async (req, res) => {
    let data = req.body;
    console.log(data);

    const command = await Command.create({
      address: data. address,
      phone: data.phone,
      total: 0,
      status: 0,
      user: req.user.id,
    });
  
    data.command_products.forEach(async (product) => {

      await CommandProduct.create({
        quantity: product.qty,
        price: product.price,
        total: product.qty * product.price,
        command_id: command.id,
        product_id: product.id,

      });
    });
  
    res.json({
      command: command,
    });
  };
