'use strict';

module.exports = function (grunt) {

  var Path = require('path');

  grunt.registerMultiTask('generate', 'Generate Slug Rules from JSON files', function () {

    var charmaps = this.data.charmaps;
    var charmapsContent = grunt.file.read(charmaps);
    var insertObject = {};
    var rulesCount = 0;

    this.filesSrc.forEach(function (filepath) {
      var key = Path.basename(filepath, '.json');
      var data = grunt.file.readJSON(filepath);
      var rulesCnt = Object.keys(data).length;
      insertObject[key] = data;
      rulesCount += rulesCnt;
    });

    var newContent = '/*START*/ ' + JSON.stringify(insertObject, null, 2) + '; /*END*/';
    var oldContent = charmapsContent.match(/\/\*START\*\/([^&]*)\/\*END\*\//gm)[0];
    charmapsContent = charmapsContent.replace(oldContent, newContent);
    
    grunt.file.write(charmaps, charmapsContent, 'utf8');

    grunt.log.ok(rulesCount, 'rules successfully written to', Path.basename(charmaps));

  });

};