# os-monitor
os-monitor is a node.js based server monitoring system emitting an event every with system stats every 5 seconds.

### Usage
```
  var monitor = require('os-monitor');

  monitor = new monitor();
  monitor.on('monitor', function(info) {
    console.log(info);
  });

```
