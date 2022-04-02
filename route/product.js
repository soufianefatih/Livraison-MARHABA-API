const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController');
const multer = require('multer')
const upload = multer();
const AuthMiddleware = require('./../middleware/Authmiddleware');


router
    .route('/create')
    .post(upload.fields([{ name: 'image', maxCount: 1}]),AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),ProductController.create) 
    
 router
    .route('/:id')
    .get(ProductController.ById) 

 router
    .route('/')
    .get(ProductController.all) 

 router
    .route('/delete/:id')
    .delete(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),ProductController.delete) 
    
 router
    .route('/update/:id')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),ProductController.update)   
    
module.exports = router;