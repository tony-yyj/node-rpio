let rpio = require('rpio');
// 打开11号针脚作为输出
rpio.open(11, rpio.OUTPUT);

function blink() {
    rpio.write(11, rpio.HIGH);
    setTimeout(function ledOff() {
        rpio.write(11, rpio.LOW);
    }, 500);
}

setInterval(blink, 1000);