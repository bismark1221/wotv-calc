'use strict';

module.exports = function (grunt) {
  
  var Formatter = require('typescript-formatter');

  grunt.registerMultiTask('format', 'Format charmaps.ts to prettier TypeScript', function () {
    var done = this.async();

    Formatter.processFiles(this.filesSrc, {
      indentSize: 2,
      tabSize: 2,
      newLineCharacter: '\r\n',
      convertTabsToSpaces: true,
    }).then(function (file) {
      grunt.file.write('./charmaps.ts', file['./charmaps.ts'].dest, 'utf8');
      grunt.log.ok('charmaps.ts successfully formatted.');
      done();
    });
  });

};