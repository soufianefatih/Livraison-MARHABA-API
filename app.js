const express = require('express');
const app = express ();
const bodyParser = require("body-parser");
const morgan = require('morgan')
const cors = require('cors')
require('./model/index');

app.use(cors())
//  connection database 

app.use("/upload", express.static("./upload"));

const db = require('./config/database')

db
    .authenticate()
    .then(() => {
        console.log('Connection successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    // morgan
    morgan.token('body', (req)=>JSON.stringify(req.body));
    morgan.token('id', (req)=> req.params.id);
    app.use(morgan(' :url :method  :body '))
    app.use(morgan('combined'))

  //* the will let us get data the data form post
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

//* Require Routes
const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");
const categoryRoutes = require("./route/category");
const productRoutes = require("./route/product");
const commandtRoutes = require("./route/command");
const factureRoutes = require("./route/facture");


//* Register Our Routes
  app.use("/api/marhaba/", authRoutes);
  app.use("/api/marhaba/users", userRoutes);
  app.use("/api/marhaba/category",categoryRoutes);
  app.use("/api/marhaba/product",productRoutes);
  app.use("/api/marhaba/command",commandtRoutes);
  app.use("/api/marhaba/facture",factureRoutes);








const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});
