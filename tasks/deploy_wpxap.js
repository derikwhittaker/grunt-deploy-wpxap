/*
 * grunt-deploy-wpxap
 * https://github.com/derikwhittaker/grunt-deploy-wpxap
 *
 * Copyright (c) 2014 Derik Whittaker
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var exec = require('child_process').exec;

var cmdFileName = 'deployXapCmd.cmd';
var validInstallCommands = ['installlaunch', 'update', 'launch', 'uninstall'];
var validTargetDevices = ['xd', 'de'];

module.exports = function(grunt) {
    
    function buildCmd(options){
    
        return util.format('start "" "%s" /%s %s /targetdevice:%s', 
                            options.xapDeployCmdFilePath,
                            options.installCmd,
                            options.xapFilePath,
                            options.targetDevice );
    };
    
    function verifyOptions(options){
        var errors = [];
        
        if( options.installCmd === "" ){
            errors.push('No install command was not provided but is required.');
        }
        if( validInstallCommands.indexOf(options.installCmd) < 0 ){
            errors.push('The install cmd was in the list of valid commands.');
        }
        
        if( options.targetDevice === "" ){
            errors.push('No target device was not provided but is required. See for valid options http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff402565(v=vs.105).aspx#BKMK_commandline');
        }
        if( validTargetDevices.indexOf(options.targetDevice) < 0 ){
            errors.push('The target devide was in the list of valid commands.');
        }
        
        if( options.xapFilePath === "" ){
            errors.push('No file path to the xap was not provided but is required.');
        }
        if( !grunt.file.exists( options.xapFilePath ) ){
            errors.push('The file path to the xap was not valid -- ' + options.xapFilePath);
            errors.push('If running on Windows make sure you put the double slash "\\" for the folder separator.');
        }        

        if( options.xapDeployCmdFilePath === "" ){
            errors.push('No file path to the xap deploy command was not provided but is required.');
        }
        if( !grunt.file.exists( options.xapDeployCmdFilePath ) ){
            errors.push('The file path to the xap deploy command was not valid -- ' + options.xapFilePath);
            errors.push('If running on Windows make sure you put the double slash "\\" for the folder separator.');
        }           
        
        if( errors.length > 0 ){
            errors.forEach(function(error){
                grunt.log.fail(error);                
            });   
            
            grunt.fail.fatal('There were configuration errors which need to be resolved before you can continue.  See for valid options http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff402565(v=vs.105).aspx#BKMK_commandline');
        }
    }

    grunt.registerMultiTask('deploy_wpxap', 'Will deploy a Windows Phone XAP to the emulator or a device', function() {
    
        var options = this.options({
            installCmd: 'installlaunch',
            targetDevice: 'xd',
            xapFilePath: '',
            xapDeployCmdFilePath: 'C:\\Program Files (x86)\\Microsoft SDKs\\Windows Phone\\v8.0\\Tools\\XAP Deployment\\XapDeployCmd.exe'
        }); 
     
        verifyOptions(options);
        
        var cmd = buildCmd(options);
        
        // total hack but was not able to get the raw command to run correctly
        // when using child_process.
        grunt.file.write(cmdFileName, cmd);
        
        var child = exec(cmdFileName, function(error, stdout, stderr){            
            console.log(stderr);            
        });
        
    });

};
