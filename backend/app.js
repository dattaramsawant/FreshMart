require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);


app.use((req, res) => {
  res.status(400).json({
      message: "Url not found"
  });
});

// error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      console.error(err);
  }
  res.status(500).json({ message: err.message });
});

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  process.exit(1);
});

process.on('unhandledRejection', function (err) {
  console.error((new Date).toUTCString() + ' unhandledRejection:', err.message)
  process.exit(1);
});

module.exports = app;