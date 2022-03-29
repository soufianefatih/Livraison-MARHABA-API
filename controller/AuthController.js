const { User} = require("../model");


exports.register = async (req, res) => {
    res.json(req.body);
    let data = req.body;
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      'status': 0,
      role : data.type ? 'livreur': 'client',

    });
  
    try {
      res.json(newUser);
    } catch (err) {
      res.status(400).send("bad request");
    }
  };