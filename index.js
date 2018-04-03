'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/face');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
