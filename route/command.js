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
module.exports = router;