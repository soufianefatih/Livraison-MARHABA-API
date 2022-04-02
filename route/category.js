const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/CategoryController');
const AuthMiddleware = require('./../middleware/Authmiddleware');




router
    .route('/create')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),CategoryController.create) 
    
    
router
    .route('/update/:id')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),CategoryController.update)   
    
 router
    .route('/')
    .get(CategoryController.all)

 router
    .route('/delete/:id')
    .delete(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),CategoryController.delete) 
    
    
 router
    .route('/:id')
    .get(CategoryController.ById)      
    
    
router
    .route('/products/:id')
    .get(CategoryController.product)       
        



module.exports = router;