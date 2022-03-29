const express = require('express');
const app = express ();
const bodyParser = require("body-parser");
require('./model/index');


//  connection database 

const db = require('./config/database')

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// virification token / login
const AuthMiddleware = require('./middleware/Authmiddleware');


    //* the will let us get data the data form post
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

//* Require Routes
const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");


//* Register Our Routes
  app.use("/api/marhaba/", authRoutes);
  app.use("/api/marhaba/users",AuthMiddleware.virifylogin, userRoutes);


  // force: true 


const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});
