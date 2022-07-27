/**
 * setThrottle() takes a function and returns a wrapper that throttles
 * calls to the function
 * 
 * @param {Function} callback function that is wrapped and returned
 * @param {Number} ms time in milliseconds
 * @returns {Function}
 */
export function setThrottle(callback, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;
    return function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        isThrottled = true;
        callback.apply(this, arguments);
        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    };
}
