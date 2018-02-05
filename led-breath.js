let rpio = require('rpio');

rpio.open(11, rpio.OUTPUT);

let buf = new Buffer(8).fill(rpio.LOW);
buf[0] = buf[2] = buf[4] = buf[6] = rpio.HIGH;
rpio.writebuf(13, buf);
