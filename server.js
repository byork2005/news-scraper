var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');

var axios = require('axios');
var cheerio = require('cheerio');

// Require all models
var db = require('./models');

var PORT = 5000;

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
//  ***Need to check where mongo needs to connect***
mongoose.connect('mongodb://localhost/articles', {
  useMongoClient: true
});

//// Routes
// Home Page
app.get('/', function(req, res) {
  db.article.find({}).then(function(results) {
    res.render('index', { Data: results });
  });
});

// Get Saved articles
app.get('/saved', function(req, res) {
  db.article.find({}).then(function(results) {
    console.log('all saved: ', results);
    res.render('saved', { Data: results });
  });
});

// Get Saved article notes by ID
app.get('/saved/:id', function(req, res) {
  db.article
    .findOne({ _id: req.params.id })
    .populate('note')
    .then(function(dbArticle) {
      res.json(dbArticle);
    });
});

// Scrape KC Star for new articles
app.get('/scrape', function(req, res) {
  let results = [];
  axios.get('https://www.kansascity.com').then(function(response) {
    var $ = cheerio.load(response.data);

    // (i: iterator. element: the current element)
    $('h4.title').each(function(i, element) {
      var title = $(element).text();
      var link = $(element)
        .children()
        .attr('href');
      results.push({
        title: title,
        link: link
      });
    });

    console.log('Results: ', results);
    res.render('scrape', { Data: results });
  });
});

// Save a scraped article
app.post('/save', function(req, res) {
  db.article.create(data).then(function(dbArticle) {
    console.log('saved: ', dbArticle);
  });
});

// Delete a saved article
app.delete('/delete', function(req, res) {
  db.article.remove(data).then(function(dbArticle) {
    console.log('deleted: ', dbArticle);
  });
});
