/* jshint esversion: 6 */
const EventEmitter = require('events').EventEmitter;
const util = require('util');
const files = require('./config/files');
const fs = require('fs');
const os = require('os');

var monitor = function() {

  var _this = this;

  this.init = function() {
    files.map(function(file) {
      fs.watchFile(file, _this.tick);
    });
  };
  this.tick = function() {
    var statusObject = {
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      uptime: os.uptime(),
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      cpus: os.cpus(),
      platform: os.platform(),
      type: os.type(),
      arch: os.arch(),
      release: os.release()
    };
    this.emit('monitor', statusObject);
  };
};

util.inherits(monitor, EventEmitter);
module.exports = monitor;
