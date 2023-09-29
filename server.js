const { app, router } = require('./config/startup.js');
const { db } = require('./config/config.js');

const fs = require('fs');
const axios = require('axios');

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/secound', (req, res) => {
  res.sendFile('public/secound.html', { root: __dirname });
});

let htmlArray = [];

/*
fetch(`http://localhost:5001${r.route.path}`)
  .then(function (response) {
    // The API call was successful!
    return response.text();
  })
  .then(function (html) {
    // This is the HTML from our response as a text string
    //console.log(html);
    // Convert the HTML string into a document object

          //const parser = new DOMParser();
          //const doc = parser.parseFromString(html, 'text/html');

    //console.log('doc: ', doc);
  })
  .catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
*/
/*
const getAllPaths = require('./divFunctions/getAllPaths.js');

console.log(getAllPaths());

//console.log(allPathsArray);
*/
app.listen(5001, () => {
  console.log(`Listening to port 5001`);
});

/*
db.query('SELECT * FROM user_navigation', function (err, result, fields) {
  if (err) throw err;
  console.log(result[0].click);
});
*/
