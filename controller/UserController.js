const { User } = require("../model");


 /* -------find All users with role = delivery ----- */

exports.delivery = async (req, res) => {
  
  const users = await User.findAll({
  
        where:{role: 'livreur'}
  
  });

  res.json(users);
};

/* -------find All users ----- */

exports.all = async (req, res) => {
 
  const users = await User.findAll();

  res.json(users);
};

/* -------create user by admin ----- */

exports.create = async (req, res) => {
  let data = req.body;
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  });
  res.json(user);
};

/* -------update user by admin ----- */


exports.update = async (req, res) => {
  let data = req.body;
  const userUpdate = await User.update(
    {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      status: data.status,

    },
    { where: { id: req.params.id } }
  );

  res.json(userUpdate);

};

/* -------delete user by admin ----- */

exports.delete = async (req, res) => {

    try {
        const user = await User.destroy({where: { id: req.params.id}});

        res.json(user);

    } catch (error) {
        res.status(400).send(error);
    }
}

/* -------find one user  ----- */

exports.ById = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
    
        res.json(users);
      } catch (error) {
        res.status(400).send(error);
      }
};


/* -------confirm status delivery  by admin ----- */

exports.status_delivery = async (req, res) => {
  const confirmer = await User.update(
    {
      status: 1
  },
  {
      where: {
          id: req.params.id
      }
  }
  );
  res.status(200).send({message: 'confirmation successfully ',confirmer});

};



