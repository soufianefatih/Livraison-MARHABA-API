const { User } = require("../model");

exports.all = async (req, res) => {
  const users = await User.findAll();

  res.json(users);
};

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


exports.delete = async (req, res) => {

    try {
        const user = await User.destroy({where: { id: req.params.id}});

        res.json(user);

    } catch (error) {
        res.status(400).send(error);
    }
}


exports.ById = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
    
        res.json(users);
      } catch (error) {
        res.status(400).send(error);
      }
};

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



