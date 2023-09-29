const express = require('express');
const app = express();

// inside public directory.
app.use(express.static('public'));
app.use('/img', express.static('img'));

/* Get all the routes from Node.JS!! */
const router = express.Router();


module.exports = { app, router};
