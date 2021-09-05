const express = require('express'); //requiring express
const router = express.Router(); //express router
const homeController = require('../controllers/home_controller'); //home controller

router.get('/', homeController.home); //handels the home page
router.use('/files', require('./file')); //setting up scalable directory structure --> routes to /files

module.exports = router;