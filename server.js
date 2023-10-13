import express from 'express'
const app = express();

import cors from 'cors'
import fs from 'fs'
import got from 'got';

import axios from 'axios';
import { JSDOM } from 'jsdom';
import { makeDirAndFile, createIndexHTML, createRootDir } from './divFunctions/functions.js';
import puppeteer from 'puppeteer';


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://youtube.com/`
  const mainDir = 'youtube';
  const path = `./websites/${mainDir}`;

  createRootDir(path);

  await page.goto(`${url}`);
  // Wait for the 'link' elements to appear on the page
  await page.waitForSelector('link[rel="stylesheet"]');

  const fullHTML = await page.evaluate(() => document.querySelector('*').outerHTML);

  createIndexHTML(mainDir, fullHTML)

  // ---------CSS----------------------------------------------------------------
  const linkElements = await page.$$eval('link[rel="stylesheet"]', (links) => {
    return links.map((link) => link.href);
  });

  makeDirAndFile('.css', fullHTML, path, linkElements, 'href=', url)
  // -------------------------------------------------------------------------
  const linkImage = await page.$$eval('img[src]', (imgs) => {
    return imgs.map((img) => img.src)
  })

  for (let i = 0; i < linkImage.length; i++) {
    console.log('linkImage: ', linkImage[i]);
  }

  makeDirAndFile('.png', fullHTML, path, linkImage, 'src=', url)
  makeDirAndFile('.jpg', fullHTML, path, linkImage, 'src=', url)


  /*
  const linkImage = await page.$$eval('img', (links) => {
    return links.map((link) => link.href);
  });
  */
  /*
  for (let i = 0; i < linkImage.length; i++) {
    console.log('linkImage: ', linkImage[i]);
  }
  */
  //<img src='images/v.png' width='85' height='30'  border='0'>

  await browser.close();
})();

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

app.listen(5000, () => {
  console.log(`Listening to port 5000`);
});
