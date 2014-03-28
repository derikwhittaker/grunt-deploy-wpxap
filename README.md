# grunt-deploy-wpxap

> Will deploy a Windows Phone XAP to the emulator or a device

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-deploy-wpxap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-deploy-wpxap');
```

## The "deploy_wpxap" task

### Overview
In your project's Gruntfile, add a section named `deploy_wpxap` to the data object passed into `grunt.initConfig()`.
This works by creating a local deployXapCmd.cmd file local to your grunt file and executing this file.  I am not too happy
with this route but it was the only way I could get this to work.

For details on launching the xap and its options please see this [MSDN](http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff402565.aspx) article.

```js
grunt.initConfig({
    deploy_wpxap: {
      emulator: {
        options: {
            xapFilePath: 'c:\\fullpath\\myxap.xap'
        }
      },
      device: {
        options: {
            xapFilePath: 'c:\\fullpath\\myxap.xap'
            targetDevice: 'de'
        }
      },
    },
});
```

### Options

#### options.installCmd
Type: `String`
Default value: `'intalllaunch'`

A value to indicate what type of install you wish to execute.  The valid options are 'installlaunch', 'update', 'launch', 'uninstall'

#### options.targetDevice
Type: `String`
Default value: `'xd'`

A value indicate what devide to target for the install.  The valid options are 'xd' (emulator), 'de' (device).

#### options.xapFilePath
Type: `String`
Default value: `''`

The full path to the xap file which will be loaded onto the device or emulator.  It is suggested you provide the full path to the xap.  Also make sure you use "\\" as your folder separator.

#### options.xapDeployCmdFilePath
Type: `String`
Default value: `'C:\\Program Files (x86)\\Microsoft SDKs\\Windows Phone\\v8.0\\Tools\\XAP Deployment\\XapDeployCmd.exe'`

The full path to the xap deploy utility which will load your xap onto the device.  Also make sure you use "\\" as your folder separator.

### Usage Examples

#### Default Options
In this example, we will deploy a xap to the emulator 

```js
grunt.initConfig({
  deploy_wpxap: {
      emulator: {
        options: {
            xapFilePath: 'c:\\fullpath\\myxap.xap',            
        }
      },
  },
});
```

#### Custom Options
In this example, we will load the xap onto a real device (this load may take up to a minute)

```js
grunt.initConfig({
  deploy_wpxap: {
      device: {
        options: {
            xapFilePath: 'c:\\fullpath\\myxap.xap', 
            targetDevice: 'de'
        }
      },
  },
});
```


#### Custom Options
In this example, we will load the xap onto a real device (this load may take up to a minute)

```js
grunt.initConfig({
  deploy_wpxap: {
      device: {
        options: {
            xapFilePath: 'c:\\fullpath\\myxap.xap', 
            xapDeployCmdFilePath: 'c:\\someCustomPath\\XapDeployCmd.exe',
        }
      },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
