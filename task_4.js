function debounce(callback, wait) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), wait);
    };
}

// Example Usage
let i = 0;
function increment() {
    i++;
}
const debouncedIncrement = debounce(increment, 100);

debouncedIncrement();
setTimeout(debouncedIncrement, 50);
setTimeout(() => console.log(i), 170); // Logs i = 1 after 170ms