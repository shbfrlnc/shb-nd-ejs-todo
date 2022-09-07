// script ini untuk menjalankan server.

// begin: import modules.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
// end: import modules.

// buat express app.
const app = express();

// gunakan template engine EJS
app.set('view engine', 'ejs');

// jadikan folder public sebagai folder statis
app.use('/public', express.static(__dirname + '/public'));

// gunakan bodyparser
app.use(bodyParser.urlencoded());

// jadikan indexRouter sebagai route di path "/"
app.use('/', indexRouter);

// jalankan server di port 3000
app.listen(3000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/mycrud1');
    console.log("Server berjalan di port 3000");
});