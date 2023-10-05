const express = require('express');
const app = express();
const cors = require('cors');

let count = 0;

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

//const { app, router } = require('./config/startup.js');
const { db } = require('./config/config.js');

const fs = require('fs');
const axios = require('axios');

function initUrl() {
  const childProcess = require('child_process');

  const bash_run = childProcess.spawn('/bin/bash', ['test.sh'], {
    env: process.env
  });

  bash_run.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  bash_run.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  const input = fs.createReadStream('input.txt');
  const output = fs.createWriteStream('output.txt');

  bash_run.stdout.pipe(output);
  input.pipe(bash_run.stdin);
}

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.post('/', (req, res) => {
  console.log(req.body.url_origin);

  if (req.body.url_origin !== '' && count !== 1) {
    // Write data to the file
    const dataToWrite = `${req.body.url_origin}`;

    // Specify the file path
    const filePath = 'input.txt';

    try {
      fs.writeFile(filePath, dataToWrite, (err) => {
        if (err) {
          console.error('Error writing to the file:', err);
        } else {
          console.log('Data has been written to the file successfully.');
          fetch(`${dataToWrite}`)
            .then((response) => response.text())
            .then((result) => {
              console.log(result.split('\n'));
            });

          //initUrl();
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  count = 1;
});

app.get('/secound', (req, res) => {
  res.sendFile('public/secound.html', { root: __dirname });
});

/*
const getAllPaths = () => {
  let routePaths = [];
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      routePaths.push(r.route.path);
      console.log('r.route.path: ', r.route.path);
    }
  });
  return routePaths;
};

console.log(getAllPaths());
*/

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
app.listen(5000, () => {
  console.log(`Listening to port 5000`);
});

/*
db.query('SELECT * FROM user_navigation', function (err, result, fields) {
  if (err) throw err;
  console.log(result[0].click);
});
*/


// Checka denna!

/*
const video_slider_wrap = document.querySelector('.video-slider-wrap');
console.log('video_slider_wrap: ', video_slider_wrap);

let divArray = [];

const links = video_slider_wrap.querySelectorAll('a');
console.log('links: ', links);

let divElement = document.createElement('div');
fetch(links[0].href)
.then((response) => response.text())
.then((html) => {
divElement.innerHTML = html;

console.log('links[0].href: ', links[0].href);

let divElementSplit = divElement.innerHTML.split('\n');

// Removing blank space
for (let i = 0; i < divElementSplit.length; i++) {
if (divElementSplit[i] === '' || divElementSplit[i] === '\t') {
divElementSplit.splice(i, 1);
}
}

//Checking where the head-element is at
for (let i = 0; i < divElementSplit.length; i++) {
console.log('divElementSplit[i]: ', divElementSplit[i]);
if (divElementSplit[i].includes('<head>')) {
console.log('DET FINNS');
//console.log('i: ', i);
//console.log('divElementSplit[i]', divElementSplit[i]);
//console.log('Yes det finns en head-elemenet');
}
}

// Checking if the are any divs
for (let i = 0; i < divElementSplit.length; i++) {
if (divElementSplit[i].includes('<div')) {
//console.log(divElementSplit[i]);
if (divElementSplit[i].includes('class="*"')) {
//console.log('JA classer finns!');
}
if (divElementSplit[i].includes('id="*"')) {
//console.log('JA id finns!');
}
}
}

//console.log('divElementSplit: ', divElementSplit);
});
*/
