var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv').config();
var logger = require('morgan');

var port = 8000


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
mongoose.connect(process.env.DATABASE_URL);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;