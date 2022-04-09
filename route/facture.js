const express = require('express')
const router = express.Router()
const FactureController = require('../controller/FactureController');

const AuthMiddleware = require('./../middleware/Authmiddleware');


router
    .route('/create')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),FactureController.create) 
    

    
module.exports = router;