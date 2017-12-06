// *********************************************************************************
// api-routes.js - this file offers a set of routes for sending data
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path');
const fs = require('fs');
const db = require('../models');
const firebase = require('firebase');
const firebaseConfig = require('../config/firebase');
const Multer = require('multer');



/* File Upload Setup for Image Hosting */

const config = {
  projectId: 'mom-app-2017',
  credentials: firebaseConfig
};

var storage = require('@google-cloud/storage')(config);


const bucket = storage.bucket('mom-app-2017.appspot.com');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 10mb, we can change as needed.
  }
});


// Routes
// =============================================================
module.exports = (app) => {

  /*** Adding new file to the storage*/
  app.post('/upload', multer.single('file'), (req, res) => {
    console.log('Upload Image');

    let file = req.file;
    if (file) {
      uploadImageToStorage(file, res).then((success) => {
        //res.json(JSON.stringify(success));
        console.log(success);
      }).catch((error) => {
        console.error(error);
      });
    }
  });

  /**
   * Upload the image file to Google Storage
   * @param {File} file object that will be uploaded to Google Storage
   */
  const uploadImageToStorage = (file, res) => {
    console.log(file);
    let prom = new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let newFileName = `${file.originalname}_${Date.now()}`;
      let fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      blobStream.on('error', (error) => {
        console.log(error);
        reject('Something is wrong! Unable to upload at the moment.');
      });

      blobStream.on('finish', () => {
        //console.log(fileUpload, getPublicUrl(fileUpload));
        // The public URL can be used to directly access the file via HTTP.
        fileUpload.makePublic().then(() => {
          console.log(fileUpload.metadata);
          const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
          writeFile(url, fileUpload.metadata, res)
          resolve(url);
        });
      });

      blobStream.end(file.buffer);
    });
    return prom;
  }


  function writeFile(url, file, res) {
    db.Document.create({
      file_name: file.name,
      file_type: file.contentType,
      url: url
    })
    .then((dbRes) => {
      res.json(JSON.stringify(dbRes));
    });
  }

  app.post('/api/post', function(req, res){
    db.Post.create({
      poster_name: req.body.posterName,
      item_name: req.body.item,
      item_description: req.body.description,
      location: req.body.location,
      poster_email: req.body.posterEmail,
      borrowed: req.body.borrowed
    })
    .then((dbRes) => {
      //console.log(dbRes);

      //Update the newly created document to connect to post
      if (req.body.DocumentId) {
        db.Document.update({
          PostId: dbRes.dataValues.id
        },{
          where: {
            id: req.body.DocumentId
          }
        }).then(function(dbPost) {
          res.status(200).send({result: 'redirect', url: `/posts/success/${dbRes.dataValues.id}`})
        });
      } else {
        console.log('No Image Uploaded');
        res.status(200).send({result: 'redirect', url: `/posts/success/${dbRes.dataValues.id}`})
      }
    });
  });



  app.put('/posts/update', (req, res) => {
    console.log("hello")
    console.log(req)
    db.Post.update({
          borrowed: true
        },{
          where: {
            id: req.body.id
          }
    })

  });

};
