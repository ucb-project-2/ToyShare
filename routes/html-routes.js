// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const db = require('../models');

// Routes
// =============================================================
module.exports = (app) => {


  // index route loads view.html
  app.get('/', (req, res) => {
    res.render('index');
  });

  /****** Route for listing all posts ******/
  app.get('/posts/', (req, res) => {

    db.Post.findAll({
    include: db.Document

  }).then(function(data) {
      res.render('post-listing', { post: data });
    });

  });

  /****** Route for the new Post page ******/
  app.get('/posts/new', (req, res) => {

    res.render('upload');
  });

  // Proof of concept file Uploader.
  app.get('/posts/:id', (req, res) => {

    db.Post.findOne({
    include: db.Document,
    where: {
      id: req.params.id
      }
    }).then(function(data) {
      res.render('post-detail', { post: data.dataValues });
    });
  });

  app.get('/posts/success/:id', (req, res) => {

    db.Post.findOne({
    include: db.Document,
    where: {
      id: req.params.id
    }
  }).then(function(data) {
      res.render('success', { post: data.dataValues });
    });
  });

}; //End module exports
