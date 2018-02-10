var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');

var axios = require('axios');
var cheerio = require('cheerio');

// Require all models
// var db = require('./models');

var PORT = 5000;

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import Routes
const routes = require('./controller/scraper-controller.js');
app.use('/', routes);

app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
//  ***Need to check where mongo needs to connect***
mongoose.connect('mongodb://localhost/news-scraper', {
  useMongoClient: true
});

const db = mongoose.connection;


