// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  // index route loads view.html
  app.get('/', function(req, res) {
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


};
