/* jshint esversion: 6 */
const EventEmitter = require('events').EventEmitter;
const util = require('util');
const files = require('./config/files');
const os = require('os');
const disk = require('diskusage');

var monitor = function(interval) {

  var _this = this;
  this.interval = interval || 5000;

  this.tick = function(curr, prev) {
    disk.check('/', function(err, hdd) {
      let statusObject = {
        timestamp: new Date(),
        uptime: os.uptime(),
        memory: {
          total: Math.floor(os.totalmem() / 1024 / 1024),
          free: Math.floor(os.freemem()  / 1024 / 1024),
          used: Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024),
          percentage: Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)
        },
        cpu: {
          loadavg: os.loadavg()[0],
          count: os.cpus().length,
          percentage: Math.floor((os.loadavg()[0] / os.cpus().length) * 100)
        },
        hdd: {
          total: Math.floor(hdd.total / 1024 / 1024),
          free: Math.floor(hdd.free / 1024 / 1024),
          used: Math.floor((hdd.total - hdd.free)  / 1024 / 1024),
          percentage: Math.floor(((hdd.total - hdd.free) / hdd.total) * 100)
        }
      };
      _this.emit('monitor', statusObject);
    });
  };
  setInterval(_this.tick, _this.interval);
};

util.inherits(monitor, EventEmitter);
module.exports = monitor;
