'use strict';

module.exports = function (grunt) {

  var Path = require('path');

  require('time-grunt')(grunt);

  var config = {
    rules: 'rules'
  };

  grunt.initConfig({
    config: config,
    generate: {
      all: {
        charmaps: Path.resolve('./charmaps.ts'),
        files: {
          src: ['<%= config.rules %>/**/*.json']
        }
      }
    },
    format: {
      charmaps: {
        files: {
          src: ['./charmaps.ts']
        }
      }
    },
    fixindent: {
      charmaps: {
        src: ['./charmaps.ts'],
        dest: './',
        options: {
          style: 'space',
          size: 2
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-fixindent');

  grunt.registerTask('build', ['generate:all', 'format', 'fixindent']);
  grunt.registerTask('default', ['generate:all', 'format', 'fixindent']);

};