const mongoose = require('mongoose'); //requiring mongoose
const multer = require('multer'); //requiring multer
const path = require('path'); //requiring path
const FILE_PATH = path.join('/uploads'); //csv files are stored here

const fileSchema = mongoose.Schema({
    //path where the file is stored
    file_path: {
        type: String,
        required: true
    },

    //original name of the file
    original_name: {
        type: String,
        required: true
    }
});

//setting up multer
let storage = multer.diskStorage({
    //destination of the file
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', FILE_PATH));
    },

    //name of the file Date.now() is used to give unique names
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});

//setting the statics
fileSchema.statics.uploadedFile = multer({ storage: storage }).single('file'); //we can upload 1 file at a time
fileSchema.statics.filePath = FILE_PATH; //path where the file is stored

const File = mongoose.model('File', fileSchema); //modelling the schema
module.exports = File;
