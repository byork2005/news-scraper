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
        var title = $(element).text().trim();
        var link = $(element)
          .children()
          .attr('href')
        results.push({
          title: title,
          link: link
        });
      });
      res.render('scrape', { Data: results });
    });
  });
  
  // Save a scraped article
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
        console.log('all saved: ', results);
        res.render('saved', { Data: results });
      });
    });
    
    // Get Saved article notes by ID
    router.get('/saved/:id', function(req, res) {
      db.Article
        .findOne({ _id: req.params.id })
        .populate('note')
        .then(function(dbArticle) {
          res.json(dbArticle);
        });
    });
  
  // Delete a saved article
  router.delete('/delete/:id', function(req, res) {
    console.log('delete req: ', req.body._id);
    // db.Article.remove(data).then(function(dbArticle) {
    //   console.log('deleted: ', dbArticle);
    // });
    res.redirect('/saved');
  });

  module.exports = router