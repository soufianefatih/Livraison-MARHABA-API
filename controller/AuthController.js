const { User} = require("../model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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



  exports.login =  async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
  
    // check email is exit
    if (!user || user.password != req.body.password) {
      res.status(400).json({ message: "user is not found" });
    } else {
      jwt.sign({  _id: user._id,
                  name : user.name,
                  email: user.email,
                  role: user.role
                }, process.env.TOKEN_SECRET, (err, token) => {
        if (err) {
          res.json({ message: "validate not correct" });
        }
        res.send({token, user});
      });
  
      //  res.json({message: 'login '});
    }
  };