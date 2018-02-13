const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('./../models');

mongoose.Promise = Promise;

//// Routes
// Home Page
router.get('/', function(req, res) {
  db.Article.find({}).then(function(results) {
    console.log('results: ', results);
    res.render('index', { Data: results });
  });
});

// Scrape KC Star for new articles
router.get('/scrape', function(req, res) {
  let results = [];
  axios.get('https://www.kansascity.com').then(function(response) {
    var $ = cheerio.load(response.data);

    // (i: iterator. element: the current element)
    $('h4.title').each(function(i, element) {
      var title = $(element)
        .text()
        .trim();
      var link = $(element)
        .children()
        .attr('href');
      results.push({
        title: title,
        link: link
      });
    });
    res.render('scrape', { Data: results });
  });
});

// Save a scraped article
// router.post('/save', function(req, res) {
//   const articleObj = {};
//   articleObj.title = req.body.title;
//   articleObj.link = req.body.link;
//   db.Article.create(articleObj).then(function(dbArticle) {
//     console.log('saved: ', dbArticle);
//   });
//   res.redirect('/scrape');
// });

router.post('/save', function(req, res) {
  const articleObj = {};
  articleObj.title = req.body.title;
  articleObj.link = req.body.link;
  db.Article.create(articleObj).then(function(dbArticle) {
    console.log('saved: ', dbArticle);
  });
  res.redirect('/scrape');
});

// Get Saved articles
router.get('/saved', function(req, res) {
  db.Article.find({}).then(function(results) {
    res.render('saved', { Data: results });
  });
});

// Get Saved article notes by ID
router.get('/saved/:id', function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate('Note')
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log('dbarticle: ',dbArticle)
    })
    .catch(function(err) {
      console.log('dbarticle fail: ',dbArticle)
      res.json(err);
    });
});

// Delete a saved article
router.delete('/delete', function(req, res) {
  db.Article.findByIdAndRemove(req.body.id).then(function(dbArticle) {
    console.log('deleted: ', dbArticle);
  });
  res.end();
});

// Save a note
router.post('/note/:id', function(req, res) {
  console.log('save body: ', req.note);
  // db.Note.create(req.body).then(function(dbNote) {
  //   return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
  // })
  // .then(function(dbArticle) {
  //   res.json(dbArticle);
  // })
  // .catch(function(err) {
  //   res.json(err)
  // })
});

module.exports = router;
