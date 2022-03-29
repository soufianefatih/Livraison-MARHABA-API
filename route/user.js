const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController');

router
    .route('/All')
    .get(UserController.all)



module.exports = router;