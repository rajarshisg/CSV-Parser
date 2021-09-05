const express = require('express'); //requiring express
const router = express.Router(); //express router
const FileController = require('../controllers/file_controller'); //controller for files

router.post('/upload', FileController.uploadFile); //handels file upload
router.get('/:id/delete', FileController.deleteFile); //handles file deletion
router.get('/:id', FileController.display); //handels file display

module.exports = router;