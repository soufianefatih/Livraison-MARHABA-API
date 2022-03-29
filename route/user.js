const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController');

router
    .route('/')
    .get(UserController.all)

router
    .route('/create')
    .post(UserController.create)  
    
    
 router
    .route('/update/:id')
    .post(UserController.update) 
    
 router
    .route('/delete/:id')
    .delete(UserController.delete)
    
 router
    .route('/:id')
    .get(UserController.ById)       



module.exports = router;