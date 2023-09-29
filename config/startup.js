
/*
const express = require('express');
const app = express();
const cors = require('cors');

// inside public directory.
app.use(express.static('public'));
app.use(express.json());
app.use('/img', express.static('img'));
app.use(
  cors({
    origin: '*'
  })
);

/* Get all the routes from Node.JS!! */


//const router = express.Router();

//module.exports = { app, router };
