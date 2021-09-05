const express = require('express'); //requiring express
const app = express(); //app has all the properties of express
const db = require('./config/mongoose'); //requiring the db config file
const PORT = process.env.PORT || 8000; //port on which our server runs


app.use(express.urlencoded()); //to parse data

app.use(express.static('./assets')); //setting the statics
app.set('view engine', 'ejs'); //setting the view engine
app.set('views', './views'); //setting the views location

app.use('/', require('./routes/index')); //setting the router

//server listens on port (8000 by default)
app.listen(PORT, function (err) {
    if (err) {
        console.log('Error occured in running the server!');
    }
    console.log(`Server is up and running on PORT::${PORT}`);
});






