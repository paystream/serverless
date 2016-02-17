(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.lambda = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Lib
 */

// Single - All
module.exports.singleAll = function(event, cb) {

  var response = {
    message: 'Your Serverless function ran successfully via the \''
    + event.httpMethod
    + '\' method!'
  };

  return cb(null, response);
};

// Multi - Create
module.exports.multiCreate = function(event, cb) {

  var response = {
    message: 'Your Serverless function \'multi/create\' ran successfully!'
  };

  return cb(null, response);
};

// Multi - Show
module.exports.multiShow = function(event, cb) {

  var response = {
    message: 'Your Serverless function \'multi/show\' ran successfully with the following ID \'' + event.pathId + '\'!'
  };

  return cb(null, response);
};
},{}],2:[function(require,module,exports){
'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');

// Lambda Handler
module.exports.handler = function(event, context) {

  lib.multiShow(event, function(error, response) {
    return context.done(error, response);
  });
};
},{"../../lib":1,"serverless-helpers-js":4}],3:[function(require,module,exports){
'use strict';

/**
 * Find closest .env file. Need to do this because .env is not always at root of project (like during local testing)
 */

var path = require('path'),
    fs   = require('fs');

function fileExistsSync(path) {
  try {
    var stats = fs.lstatSync(path);
    return stats.isFile();
  }
  catch (e) {
    return false;
  }
}

var dirName = eval('__dirname'),
    i       = 0;

while (i < 6) {
  if (fileExistsSync(path.join(dirName, '.env'))) {
    break;
  }

  dirName = path.join(dirName, '..');
  ++i;
}

require('dotenv').config({path: path.join(dirName, '.env'), silent: true});
},{"dotenv":5,"fs":undefined,"path":undefined}],4:[function(require,module,exports){
/**
 * Serverless Helpers JS
 */


var ServerlessHelpers = {

  // Load Environment Variables
  loadEnv: function() {
    require('./env');
  }

};

// Export
module.exports = ServerlessHelpers;
},{"./env":3}],5:[function(require,module,exports){
'use strict'

var fs = require('fs')

module.exports = {
  /*
   * Main entry point into dotenv. Allows configuration before loading .env and .env.$NODE_ENV
   * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
   * @returns {Boolean}
  */
  config: function (options) {
    var path = '.env'
    var encoding = 'utf8'
    var silent = false

    if (options) {
      if (options.silent) {
        silent = options.silent
      }
      if (options.path) {
        path = options.path
      }
      if (options.encoding) {
        encoding = options.encoding
      }
    }

    try {
      // specifying an encoding returns a string instead of a buffer
      var parsedObj = this.parse(fs.readFileSync(path, { encoding: encoding }))

      Object.keys(parsedObj).forEach(function (key) {
        process.env[key] = process.env[key] || parsedObj[key]
      })

      return true
    } catch(e) {
      if (!silent) {
        console.error(e)
      }
      return false
    }
  },

  /*
   * Parses a string or buffer into an object
   * @param {String|Buffer} src - source to be parsed
   * @returns {Object}
  */
  parse: function (src) {
    var obj = {}

    // convert Buffers before splitting into lines and processing
    src.toString().split('\n').forEach(function (line) {
      // matching "KEY' and 'VAL' in 'KEY=VAL'
      var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
      // matched?
      if (keyValueArr != null) {
        var key = keyValueArr[1]

        // default undefined or missing values to empty string
        var value = keyValueArr[2] ? keyValueArr[2] : ''

        // expand newlines in quoted values
        var len = value ? value.length : 0
        if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
          value = value.replace(/\\n/gm, '\n')
        }

        // remove any surrounding quotes and extra spaces
        value = value.replace(/(^['"]|['"]$)/g, '').trim()

        // is this value a variable?
        if (value.charAt(0) === '$') {
          var possibleVar = value.substring(1)
          value = obj[possibleVar] || process.env[possibleVar] || ''
        }
        // varaible can be escaped with a \$
        if (value.substring(0, 2) === '\\$') {
          value = value.substring(1)
        }

        obj[key] = value
      }
    })

    return obj
  }

}

module.exports.load = module.exports.config

},{"fs":undefined}]},{},[2])(2)
});