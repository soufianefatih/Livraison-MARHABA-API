const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController');
const AuthMiddleware = require('./../middleware/Authmiddleware');

router
    .route('/')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.all)

router
    .route('/create')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.create)  
    
    
 router
    .route('/update/:id')
    .post(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.update) 
    
 router
    .route('/delete/:id')
    .delete(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.delete)
    
 router
    .route('/:id')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.ById) 


 router
    .route('/status/:id')
    .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.status_delivery)   
 
    //  router
   //  .route('/delivry')
   //  .get(AuthMiddleware.virifylogin,AuthMiddleware.UserRole('admin'),UserController.delivry)         



module.exports = router;