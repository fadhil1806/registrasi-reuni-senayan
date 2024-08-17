require('dotenv').config();
const {PORT} = process.env

var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const confirmRouter = require('./routes/peserta')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', confirmRouter);

app.listen(PORT, () => console.log(`Server running in ${PORT}`))

