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

// exports.login = async (req, res) => {
//   const user = await User.findOne({
//     where: { email: req.body.email },
//   });
//   var passwordIsValid = bcrypt.compareSync(
//             req.body.password,
//             user.password
//           );

  
//   // check email is exit
//   if (!user ) {
//     res.status(400).json({ message: "user is not found" });
//   } 

//   if (!passwordIsValid) {
//             return res.status(401).send({

//               message: "Invalid Password!",
//             });
//           }
//     jwt.sign(
//       { id: user.id, name: user.name, email: user.email, role: user.role },
//       process.env.TOKEN_SECRET,
//       (err, token) => {
//         if (err) {
//           res.json({ message: "validate not correct" });
//         }
//         res.send({ token, user });
//       }
//     );
  
// };



// gggggggggggggggggggggggggggggggg


exports.login = async (req, res) => {
 await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let Comparepassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!Comparepassword) {
        return res.status(401).send({
          message: "Password Not Correct!",
        });
      }
      var token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.TOKEN_SECRET, {
        expiresIn: 90000,
      });

      return res.status(200).send({
        user,
        token
      });
      
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};