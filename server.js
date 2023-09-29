const fs = require('fs');
//
const port = 5001;
const { db } = require('./config/config.js');

const express = require('express');
const app = express();

// inside public directory.
app.use(express.static('public'));
app.use('/img', express.static('img'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/secound', (req, res) => {
  res.sendFile('public/secound.html', { root: __dirname });
});

/* Get all the routes from Node.JS!! */
const router = express.Router();

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

/*
db.query('SELECT * FROM user_navigation', function (err, result, fields) {
  if (err) throw err;
  console.log(result[0].click);
});
*/
