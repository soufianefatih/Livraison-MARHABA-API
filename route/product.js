const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController');
const multer = require('multer')
const upload = multer();

router
    .route('/create')
    .post(upload.fields([{ name: 'image', maxCount: 1}]),ProductController.create) 

 router
    .route('/:id')
    .get(ProductController.ById) 
    
 router
    .route('/:id')
    .get(ProductController.ById) 

 router
    .route('/')
    .get(ProductController.all) 
module.exports = router;