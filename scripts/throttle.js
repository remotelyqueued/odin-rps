/**
 * setThrottle() takes a function and returns a wrapper that throttles
 * calls by ms to the function
 *
 * note: gameThrottle()
 * I didn't need a reference to the context
 * this in the event handler, if not an arrow function, would be the button 
 * which I passed as an argument
 * this from the handler is undefined
 * 
 * https://javascript.info/modules-intro#in-a-module-this-is-undefined
 *
 * note: testThrottle()
 * same reason for this as above
 * the test function throttle will return the previous results
 * if not enough time has passed
 * 
 * https://www.30secondsofcode.org/js/s/throttle
 * https://javascript.info/task/throttle
 *
 * @param {Function} callback function that is wrapped
 * @param {Number} ms time in milliseconds
 * @return {Function} wrapper
 * @wrapper @return {Object} savedResults
 */
export function setThrottle(callback, ms) {
    let isThrottled, savedArgs, savedResults;
    return function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
        } else {
            isThrottled = true;
            savedResults = callback.apply(null, arguments);
            setTimeout(function () {
                isThrottled = false;
                if (savedArgs) {
                    wrapper.apply(null, savedArgs);
                    savedArgs = null;
                }
            }, ms);
        }
        return savedResults;
    };
}
