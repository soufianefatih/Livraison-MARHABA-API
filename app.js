const express = require('express');
const app = express ();
require('./model/index');



const db = require('./config/database')

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// const db = require('./config/config');


// force: true 
// db.sequelize.sync({alter: true}).then(()=>{
//     console.log('resync {force: true}');
// })




const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});
