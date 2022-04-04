const express = require('express')
const router = express.Router()
const CommandController = require('../controller/CommandController');
const AuthMiddleware = require('./../middleware/Authmiddleware');


router
    .route('/create')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('client'),CommandController.create) 


 router
    .route('/update/:id')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('client'),CommandController.update)     

router
    .route('/')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole(['client','admin','livreur']),CommandController.all) 

router
    .route('/:id')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole(['client','admin','livreur']),CommandController.ById)
 

 router
    .route('/commandproducts/:id')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole(['client','admin','livreur']),CommandController.Onecommand)  
   
 router
    .route('/:id/delivery/:deliveryid')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('livreur'),AuthMiddleware.dileveryStatus(1),CommandController.deliveryConfirm)
   
         
module.exports = router;