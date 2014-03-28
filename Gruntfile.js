/*
 * grunt-deploy-wpxap
 * https://github.com/derikwhittaker/grunt-deploy-wpxap
 *
 * Copyright (c) 2014 Derik Whittaker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    deploy_wpxap: {
      emulator: {
        options: {
            xapFilePath: 'd:\\OrgSpan.WinP8_Debug_AnyCPU.xap',            
        }
      },
      device: {
        options: {
            xapFilePath: 'd:\\OrgSpan.WinP8_Debug_AnyCPU.xap',
            targetDevice: 'de'
        }
      },
    },

  });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['deploy_wpxap:emulator']);

};
