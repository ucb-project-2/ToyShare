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
    /* **** Sample/Mocked Data *****/
    const data = [
      {
        id: 1,
        description: 'This is a test post'
      },
      {
        id: 2,
        description: 'What a fun application. So novel and new!'
      }
    ];
    /* **** Sample/Mocked Data *****/

    res.render('index', { post: data });
  });

  // Proof of concept file Uploader.
  app.get('/post', (req, res) => {

    res.render('upload');
  });

  // Proof of concept file Uploader.
  app.get('/post/:id', (req, res) => {

    db.Post.findOne({
    include: db.Document,
    where: {
      id: req.params.id
    }
  }).then(function(data) {
      res.render('post-detail', { post: data.dataValues });
    });

  });

};
