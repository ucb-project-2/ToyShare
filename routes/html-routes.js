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
        poster_name: 'Michelle',
        item_name: 'Baby Bjorn',
        item_img: '',
        item_desc: 'Baby Carrier',
        borrowed: '',
        poster_email: 'example@gmail.com'
      },
      {
        id: 2,
        poster_name: 'Patricia',
        item_name: 'Pack n Play',
        item_img: '',
        item_desc: 'Baby Crib/Bassinet',
        borrowed: '',
        poster_email: 'example@gmail.com'
      }
    ];
    /* **** Sample/Mocked Data *****/

    res.render('index', { post: data });
  });

  /****** Route for listing all posts ******/
  app.get('/posts/', (req, res) => {

    db.Post.findAll({
    include: db.Document//,
    // where: {
    //   borrowed: true;
    // }
  }).then(function(data) {
    console.log(data);
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
};
