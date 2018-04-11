'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: './uploads/'
});

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const Photo = require('../models/photoSchema.js');

const photoRouter = new express.Router();

photoRouter.route('/photos')
  .get((req, res) => {
    Photo.find()
      .then(photos => res.status(200).send(photos))
      .catch(err => res.status(400).send(err.message));
  });

photoRouter.route('/user')
  .post(upload.single('user'), (req, res, next) => {
    let ext = path.extname(req.file.originalname);
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET_USER,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path)
    };

    s3.upload(params, (err, s3Data) => {
      if (err) {
        res.status(500).send(err);
      }
      Photo.create({
        url: s3Data.Location
      })
        .then(user => res.send(user)) 
        .catch(err => res.send(err));
    });
  })

  .delete((req, res) => {
    Photo.findByIdAndRemove(req.params._id)
      .then(photo => {
        let imageUrl = photo.url.split('/').slice(-1)[0];
        let params = {
          Bucket: process.env.AWS_BUCKET,
          Key: imageUrl
        };
        s3.deleteMedia(params, (err, data) => {
          if (err) {
            res.send(err);
          }
          res.status(204).send('Image deleted!');
        });
      })
      .catch(err => res.send(err.message));
  });

module.exports = photoRouter;
