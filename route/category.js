const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/CategoryController');



router
    .route('/create')
    .post(CategoryController.create) 
    
    
router
    .route('/update/:id')
    .post(CategoryController.update)   
    
 router
    .route('/')
    .get(CategoryController.all)

 router
    .route('/delete/:id')
    .delete(CategoryController.delete) 
    
    
 router
    .route('/:id')
    .get(CategoryController.ById)      
    
    router
    .route('/products/:id')
    .get(CategoryController.product)       
        



module.exports = router;