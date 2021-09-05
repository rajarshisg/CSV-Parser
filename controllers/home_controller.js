const File = require('../models/file'); // File model

module.exports.home = async function (req, res) {
    try {
        let files = await File.find({}); //fetiching all the files

        //rendering the home page
        return res.render('home', {
            files: files
        });
    } catch {
        console.log('Error occured in home controller!');
    }
}