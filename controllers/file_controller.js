const File = require('../models/file'); // File model
const fs = require('fs'); //requiring fs to handle files
const csv = require('csv-parser'); //requiring csv-parser to parse csv file
const path = require('path'); //requiring path


//for csv file uploads
module.exports.uploadFile = async function (req, res) {
    try {
        // File static function
        File.uploadedFile(req, res, function (err) {
            if (err) {
                //if error occured while uploading
                console.log('Multer error!');
            }

            //if file type matches
            if (req.file && req.file.mimetype == "application/vnd.ms-excel" || req.file && req.file.mimetype == "text/csv") {
                //adding the new file to schema
                File.create({ file_path: req.file.path, original_name: req.file.originalname }, function (err, file) {
                    if (err) {
                        //error occured while creating entry in db
                        console.log('Error in uploading file');
                        return res.redirect('back');
                    } else {
                        return res.redirect('back');
                    }
                });
            } else {
                //invalid file type
                console.log("Invalid file type!");
            }
        });
    } catch {
        console.log('Error occured in upload controller!');
        return res.redirect('back');
    }
}

//for file deletion
module.exports.deleteFile = async function (req, res) {
    try {
        let file = await File.findByIdAndDelete(req.params.id); //finding the requiested file and deleting from db

        if (file) {
            //deleting file from uplaods folder
            fs.unlinkSync(file.file_path, function (err) {
                if (err) {
                    console.log('Error occured in fs.unlink()');
                    return res.redirect('back');
                } else {
                    console.log('File deleted successfully');
                }
            });
            return res.redirect('back');
        }
    } catch {
        console.log('Error occured in deleting the file!');
        return res.redirect('back');
    }
}

//for diplaying file
module.exports.display = async function (req, res) {
    try {
        let file = await File.findById(req.params.id); //finding the requested file
        const header = []; //stores the csv headers
        const results = []; //stores the rows

        //reading the csv file
        fs.createReadStream(file.file_path)
            .pipe(csv())
            .on('headers', (headers) => {
                //storing the header
                headers.map((head) => {
                    header.push(head);
                });
            })
            .on('data', (data) => results.push(data)) //storing the rows
            .on('end', () => {
                //when finished render the file page
                return res.render('file', {
                    headers: header,
                    datas: results
                })
            })

    } catch {
        console.log('Error occured while fetching the file!');
        return res.redirect('back');
    }
}