const { User } = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  let data = req.body;
  const newUser = await User.create({
    name: data.name,
    email: data.email,
    // password: data.password,
    password: bcrypt.hashSync(req.body.password, 8),
    status: data.status ?? 0,
    role: data.role == "livreur" ? "livreur" : "client",
  });

  try {
    res.json(newUser);
  } catch (err) {
    res.status(400).send("bad request");
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  
  // check email is exit
  if (!user || user.password != req.body.password) {
    res.status(400).json({ message: "user is not found" });
  } else {
    jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.TOKEN_SECRET,
      (err, token) => {
        if (err) {
          res.json({ message: "validate not correct" });
        }
        res.send({ token, user });
      }
    );
  }
};



// gggggggggggggggggggggggggggggggg


// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }
//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }
//       var token = jwt.sign({ id: user.id }, process.env.TOKENSECRET, {
//         expiresIn: 86400, // 24 hours
//       });

//       return res.status(200).send({
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         accessToken: token,
//       });
//       // var authorities = [];
//       // user.getRoles().then(roles => {
//       //   for (let i = 0; i < roles.length; i++) {
//       //     authorities.push("ROLE" + roles[i].name.toUpperCase());
//       //   }
//       //   res.status(200).send({
//       //     id: user.id,
//       //     username: user.username,
//       //     email: user.email,
//       //     roles: authorities,
//       //     accessToken: token
//       //   });
//       // });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };