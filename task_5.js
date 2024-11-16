function throttle(callback, wait) {
    let isThrottled = false;
    return function(...args) {
      if (!isThrottled) {
        callback.apply(this, args);
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, wait);
      }
    };
}

// Example Usage
let i = 0;
function increment() {
    i++;
    console.log(i);
}
const throttledIncrement = throttle(increment, 100);

throttledIncrement(); // i=1
setTimeout(throttledIncrement, 50);
setTimeout(throttledIncrement, 101); // i=2