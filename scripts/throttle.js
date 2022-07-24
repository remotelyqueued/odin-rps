/**
 * setThrottle() takes a function a limits the amount of times it can be called
 * @param {Function} callback
 * @param {Number} ms
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
