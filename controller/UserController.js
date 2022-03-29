const  {User} = require("../model");


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