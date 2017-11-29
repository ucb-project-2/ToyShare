// *********************************************************************************
// api-routes.js - this file offers a set of routes for sending data 
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
      poster_name: req.body.poster_name,
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      borrowed: req.body.borrowed,
      recipient: req.body.recipient,
      poster_email: req.body.poster_email,
      recipient_email: req.body.recipient_email
    })
    .then((dbRes) => {
      console.log(dbRes);
      res.json(dbRes)
  });

  app.delete("/api/post/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the todos we want to destroy
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

    // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the todos we want to update
    db.Todo.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbTodo) {
      res.json(dbTodo);
    });

  });
};

};
