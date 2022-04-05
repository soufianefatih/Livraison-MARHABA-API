const { status } = require("express/lib/response");
const { Command, CommandProduct , User } = require("../model");


/* -------create command by client----- */

exports.create = async (req, res) => {
  let data = req.body;
  console.log(data);
  let total = 0;
  const command = await Command.create({
    address: data.address,
    phone: data.phone,
    total:total,
    status: 0,
    client_id: req.user.id ?? 1,
     
  });

  data.command_products.forEach(async (product) => {
    try {
  
      await CommandProduct.create({
        quantity: product.qty,
        price: product.price,
        total: product.qty * product.price,
        command_id: command.id,
        product_id: product.id,
      });

      total +=  product.qty * product.price

            await Command.update(
        {
            'total': total,
        },
        {
            where: {
                id: command.id
            }
        }
    )
    } catch (error) {
      console.log("error : ", error);
    }
  });

  res.json({
    command: command,
  });
};

/* -------get All commands with info command /client/product/commandproduct/delivery ----- */


exports.all = async (req, res) => {
  const command = await Command.findAll({ include:['client','products','delivery']});

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


/* -------get ONe command with info command /client/product/commandproduct/delivery ----- */


exports.Onecommand = async (req, res) => {
  const id = req.params.id;
  try {
  const command = await Command.findOne({
    include:['client','products','delivery'] ,
    where: { id: id },
  });
  res.json(command.toJSON());
  } catch (error) {
    res.status(400).json(error);
  }
};

/* -------update command by client ----- */


exports.update = async (req, res) => {
  let data = req.body;
  const command = await Command.update(
    {
      address: data.address,
      phone: data.phone,    
    },
    { where: { id: req.params.id } }
  );

        res.status(200).send({message: 'update successfully ',command});


};

/* -------delivery set command ----- */


exports.deliveryConfirm = async (req, res) => {
  const delivery = await User.findOne({
    where: { id: req.params.deliveryid },
  });
 
      if (delivery.status == 1) {
        const command = await Command.update(
          {
              'delivery_id': req.params.deliveryid,

          },
          {
              where: {
                  id: req.params.id,

              }
          }
          )
          console.log(req.params.deliveryid),
      res.status(200).send({message: 'confirm successfully ',command});

      } else{

     
        res.status(400).json('status is not confirm');
      


      }
     

}


/* -------delivery change status command ----- */


exports.changeStatus = async (req, res) => {

 
    try{
      const status = await Command.update(
        {
            'status': 1 ,

        },
        {
            where: {
                id: req.params.id,

            }
        }
        )
        console.log(req.params.deliveryid),
    res.status(200).send({message: 'change successfully ',status});
    }
        
    catch{
      res.status(400).json('status is not confirm');

    }

      

     
      


    
     

}

