import fs from 'fs'
import got from 'got';

import axios from 'axios';
import { JSDOM } from 'jsdom';

function makeDirAndFile(fileExtension, fullHTML, path, linkElements, source, url) {
  console.log('linkElements: ', linkElements);

  let htmlSplit3 = fullHTML.replaceAll('"', '').replaceAll("'", '').replaceAll(url, '');
  const fullHTMLSplit = htmlSplit3.split('\n')


  for (let i = 0; i < fullHTMLSplit.length; i++) {
    if(fullHTMLSplit[i].includes(`${fileExtension}`) && fullHTMLSplit[i].includes(`${source}`)) {
      let beginningIndex = fullHTMLSplit[i].indexOf(`${source}`) + source.length;
      let lastIndex = fullHTMLSplit[i].indexOf(`${fileExtension}`) + fileExtension.length;

      let splitDir = fullHTMLSplit[i].substring(beginningIndex, lastIndex).split('/');
      let newDir = path;


      for (let i = 0; i < splitDir.length - 1; i++) {
        newDir = newDir + `/${splitDir[i]}`;

        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir);
        }

      }

      for (let i = 0; i < linkElements.length; i++) {
        console.log('xxxxxlinkElements: ', linkElements[i]);
        console.log('xxxxx[splitDir.length - 1]: ', splitDir[splitDir.length - 1]);
        console.log('xxxxxxxxDecodedSplitDir: ', encodeURI(splitDir[splitDir.length - 1]));
        if(linkElements[i].includes(encodeURI(splitDir[splitDir.length - 1]))) {

          if(fileExtension === '.png' || fileExtension === '.jpg') {
            console.log('newDir: ', newDir);
            console.log('splitdir: ',`${splitDir[splitDir.length - 1]}`);
            console.log('linkElements: ', linkElements[i])
            const decodedURL = decodeURI(linkElements[i]);
            console.log('decodedURL', decodedURL);

            downloadImage(decodedURL, `${newDir}/${splitDir[splitDir.length - 1]}`);
            /*
            axios.get(url, {responseType: 'arraybuffer'})
            .then((response) => {
              if (response.status === 200) {
                // The request was successful, and you can access the HTML content in response.data.
                const cssContent = Buffer.from(response.data, 'binary').toString('base64');

                fs.writeFile(`${newDir}/${splitDir[splitDir.length - 1]}`, cssContent, (err) => {
                  if (err) {
                    console.error('Error writing CSS file:', err);
                  } else {
                    console.log('CSS file created successfully.');
                  }
                });
              }
            })
            */

            /*
            axios.get(url, {
                  responseType: 'arraybuffer'
            })
            .then(response =>
              fs.writeFile(`${newDir}/${splitDir[splitDir.length - 1]}`, Buffer.from(response.data, 'binary').toString('base64'), (err) => {
                if (err) {
                  console.error('Error writing CSS file:', err);
                } else {
                  console.log('CSS file created successfully.');
                }
              });
            )
            */
          }
          else {
            console.log('linkElements: ', linkElements[i]);
            axios.get(linkElements[i])
            .then((response) => {
              if (response.status === 200) {
                // The request was successful, and you can access the HTML content in response.data.
                const cssContent = response.data;

                fs.writeFile(`${newDir}/${splitDir[splitDir.length - 1]}`, cssContent, (err) => {
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
      }
    }
  }
}



async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });
}


function createIndexHTML(mainDir, fullHTML) {
  fs.writeFile(`./websites/${mainDir}/index.html`, fullHTML, (err) => {
    if (err) {
      console.error('Error writing HTML file:', err);
    } else {
      console.log('HTML file created successfully.');
    }
  });
}

function createRootDir(path) {
  // Skapar root-dir för domänen
  try {
    // Do something
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.error(err);
  }
}

export {makeDirAndFile, createIndexHTML, createRootDir}
