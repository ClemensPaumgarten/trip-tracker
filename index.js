'use strict';

// Database
const MongoClient = require('mongodb').MongoClient;
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./server/api.js');
const MongoConnector = require('./server/db/db-connector.js');
const gKey = require('./g-key.json');
const userData = require('./user.json');

const app = express();
app.set('views', __dirname + '/website/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/website/assets'));
app.use(bodyParser.json());

const URL = 'mongodb://127.0.0.1:27017/mongodb';
const uId = userData.uId;

//Connect to mongodb and initialize app
MongoClient.connect(URL, (err, db) => {
  if (err) {
    console.log('Cannot connect to Mongodb');
    throw err;
  }

  admin.initializeApp({
    credential: admin.credential.cert(gKey),
    databaseURL: 'https://travel-diary-58ffc.firebaseio.com'
  });

  let connector = new MongoConnector('locations', db);
  api(app, connector, uId);

  console.log('Server listens on: 8080');
  app.listen(8080);
});



