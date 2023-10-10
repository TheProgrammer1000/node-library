import express from 'express'
const app = express();

import cors from 'cors'
import fs from 'fs'
import got from 'got';

import axios from 'axios';
import { JSDOM } from 'jsdom';


async function GetWebsite() {

// Specify the URL of the web page you want to fetch
const url = 'https://www.thornior.com/';

axios.get(url,
  {maxRedirects: 0,
  })
  .then((response) => {
    if (response.status === 200) {
      // The request was successful, and you can access the HTML content in response.data.
      const html = response.data;

      // Create a JSDOM instance to parse the HTML content
      const { window } = new JSDOM(html);
      const document = window.document;

      // Access the <html> element
      const htmlElement = document.documentElement;

      // Get the entire HTML structure including the closing </body> and </html> tags
      const fullHtml = htmlElement.outerHTML;

         // Write HTML content to an HTML file
         fs.writeFile('index.html', fullHtml, (err) => {
          if (err) {
            console.error('Error writing HTML file:', err);
          } else {
            console.log('HTML file created successfully.');
          }
        });

    } else {
      console.error('Failed to fetch the web page.');
    }
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
}

GetWebsite();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.thornior.com/');

  // Wait for the 'link' elements to appear on the page
  await page.waitForSelector('link[rel="stylesheet"]');

  const linkElements = await page.$$eval('link[rel="stylesheet"]', (links) => {
    return links.map((link) => link.href);
  });

  console.log(linkElements[1]);
  for (let i = 0; i < linkElements.length; i++) {
    // Hard-coded!
    if(linkElements[i].includes('style.css') || linkElements[i].includes('screen.css') || linkElements[i].includes('styles.css')) {
      console.log('linkElements[i]: ', linkElements[i]);
      console.log("Sant")

      axios.get(linkElements[i])
      .then((response) => {
        if (response.status === 200) {
          // The request was successful, and you can access the HTML content in response.data.
          const cssContent = response.data;

          // Write CSS content to a CSS file
          fs.writeFile('styles.css', cssContent, (err) => {
            if (err) {
              console.error('Error writing CSS file:', err);
            } else {
              console.log('CSS file created successfully.');
            }
          });

        }
      })
    }

  }

  await browser.close();


})();

/*
got("https://www.travankan.se/test/Test/index.html").then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});
*/
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


//import {db} from './config/config.js'



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

app.listen(5000, () => {
  console.log(`Listening to port 5000`);
});

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
