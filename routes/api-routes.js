// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const db = require('../models');

// Routes
// =============================================================
module.exports = (app) => {


  app.post('/upload', function(req, res){

    // create an incoming form object
    const form = new formidable.IncomingForm();

    // parse the incoming request containing the form data
    form.parse(req);

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../uploads/files');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      const filePath = path.join(form.uploadDir, file.name)

      fs.rename(file.path, filePath, (err) => {
        if (err) throw err;

        writeFile(filePath, file, res);
      });
    });

    function writeFile(filePath, file, res) {
      db.Document.create({
        file_name: file.name,
        file_type: file.type,
        url: filePath
      })
      .then((dbRes) => {
        res.json(JSON.stringify(dbRes));
      });
    }

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      //res.end('success');
    });

  });


  app.post('/api/post', function(req, res){
    db.Post.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location
    })
    .then((dbRes) => {
      console.log(dbRes);

      //Update the newly created document to connect to post
      if (req.body.DocumentId) {
        db.Document.update({
          PostId: dbRes.dataValues.id
        },{
          where: {
            id: req.body.DocumentId
          }
        }).then(function(dbPost) {
          res.status(200).send({result: 'redirect', url: `/post/${dbRes.dataValues.id}`})
        });
      }

    });

  });

};
