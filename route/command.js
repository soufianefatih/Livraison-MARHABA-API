const express = require('express')
const router = express.Router()
const CommandController = require('../controller/CommandController');



router
    .route('/create')
    .post(CommandController.create) 

router
    .route('/')
    .get(CommandController.all) 

router
    .route('/:id')
    .get(CommandController.ById)
 
 router
    .route('/delete/:id')
    .delete(CommandController.delete) 
    
 router
    .route('/commandproducts/:id')
    .get(CommandController.command)  
         
module.exports = router;