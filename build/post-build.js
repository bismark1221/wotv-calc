const path = require('path');
const fs = require('fs');
const util = require('util');

// get application version from package.json
const appVersion = require('../package.json').version;

// promisify core API's
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

console.log('\nRunning post-build tasks');

let mainHash = '';
let mainBundleFile = '';

// RegExp to find main.bundle.js, even if it doesn't include a hash in it's name (dev build)
let mainBundleRegexp = /^main.?([a-z0-9]*)?(\.bundle)?.js$/;

// read the dist folder files and find the one we're looking for
readDir(path.join(__dirname, '../dist/browser/'))
  .then(files => {
    mainBundleFile = files.find(f => mainBundleRegexp.test(f));

    if (mainBundleFile) {
      let matchHash = mainBundleFile.match(mainBundleRegexp);

      // if it has a hash in it's name, mark it down
      if (matchHash.length > 1 && !!matchHash[1]) {
        mainHash = matchHash[1];
      }
    }

    return true;
  }).then(() => {
    // main bundle file not found, dev build?
    if (!mainBundleFile) {
      return;
    }

    console.log(`Replacing hash (${mainHash}) in the ${mainBundleFile} and in version file`);

    // replace hash placeholder in our main.js file so the code knows it's current hash
    const mainFilepath = path.join(__dirname, '../dist/browser/', mainBundleFile);
    readFile(mainFilepath, 'utf8')
      .then(mainFileData => {
        const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
        return writeFile(mainFilepath, replacedFile);
      });

    const versionFilePath = path.join(__dirname + '/../dist/browser/assets/version.json');
    readFile(versionFilePath, 'utf8')
      .then(versionFileData => {
        const replacedFile = versionFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
        return writeFile(versionFilePath, replacedFile);
      });

    return true;
  }).catch(err => {
    console.log('Error with post build:', err);
  });
