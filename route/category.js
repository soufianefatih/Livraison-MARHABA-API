const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/CategoryController');



router
    .route('/create')
    .post(CategoryController.create)  
    
        



module.exports = router;