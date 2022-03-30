const express = require('express')
const router = express.Router()
const CommandController = require('../controller/CommandController');



router
    .route('/create')
    .post(CommandController.create) 

module.exports = router;