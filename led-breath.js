let rpio = require('rpio');

let pin = 12;           /* P12/GPIO18 */
let range = 1024;       /* LEDs can quickly hit max brightness, so only use */
let max = 128;          /*   the bottom 8th of a larger scale */
let clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
let interval = 5;       /* setInterval timer, speed of pulses */
let times = 5;          /* How many times to pulse before exiting */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
let direction = 1;
let data = 0;
let pulse = setInterval(function() {
    rpio.pwmSetData(pin, data);
    if (data === 0) {
        direction = 1;
        if (times-- === 0) {
            clearInterval(pulse);
            rpio.open(pin, rpio.INPUT);
            return;
        }
    } else if (data === max) {
        direction = -1;
    }
    data += direction;
}, interval, data, direction, times);