!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.lambda=e()}}(function(){var define,module,exports;return function e(r,n,t){function i(s,u){if(!n[s]){if(!r[s]){var f="function"==typeof require&&require;if(!u&&f)return f(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var l=n[s]={exports:{}};r[s][0].call(l.exports,function(e){var n=r[s][1][e];return i(n?n:e)},l,l.exports,e,r,n,t)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<t.length;s++)i(t[s]);return i}({1:[function(e,r,n){r.exports.singleAll=function(e,r){var n={message:"Your Serverless function ran successfully via the '"+e.httpMethod+"' method!"};return r(null,n)},r.exports.multiCreate=function(e,r){var n={message:"Your Serverless function 'multi/create' ran successfully!"};return r(null,n)},r.exports.multiShow=function(e,r){var n={message:"Your Serverless function 'multi/show' ran successfully with the following ID '"+e.pathId+"'!"};return r(null,n)}},{}],2:[function(e,r,n){"use strict";var t=(e("serverless-helpers-js").loadEnv(),e("../../lib"));r.exports.handler=function(e,r){t.multiShow(e,function(e,n){return r.done(e,n)})}},{"../../lib":1,"serverless-helpers-js":4}],3:[function(require,module,exports){"use strict";function fileExistsSync(e){try{var r=fs.lstatSync(e);return r.isFile()}catch(n){return!1}}for(var path=require("path"),fs=require("fs"),dirName=eval("__dirname"),i=0;6>i&&!fileExistsSync(path.join(dirName,".env"));)dirName=path.join(dirName,".."),++i;require("dotenv").config({path:path.join(dirName,".env"),silent:!0})},{dotenv:5,fs:void 0,path:void 0}],4:[function(e,r,n){var t={loadEnv:function(){e("./env")}};r.exports=t},{"./env":3}],5:[function(e,r,n){"use strict";var t=e("fs");r.exports={config:function(e){var r=".env",n="utf8",i=!1;e&&(e.silent&&(i=e.silent),e.path&&(r=e.path),e.encoding&&(n=e.encoding));try{var o=this.parse(t.readFileSync(r,{encoding:n}));return Object.keys(o).forEach(function(e){process.env[e]=process.env[e]||o[e]}),!0}catch(s){return i||console.error(s),!1}},parse:function(e){var r={};return e.toString().split("\n").forEach(function(e){var n=e.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);if(null!=n){var t=n[1],i=n[2]?n[2]:"",o=i?i.length:0;if(o>0&&'"'===i.charAt(0)&&'"'===i.charAt(o-1)&&(i=i.replace(/\\n/gm,"\n")),i=i.replace(/(^['"]|['"]$)/g,"").trim(),"$"===i.charAt(0)){var s=i.substring(1);i=r[s]||process.env[s]||""}"\\$"===i.substring(0,2)&&(i=i.substring(1)),r[t]=i}}),r}},r.exports.load=r.exports.config},{fs:void 0}]},{},[2])(2)});