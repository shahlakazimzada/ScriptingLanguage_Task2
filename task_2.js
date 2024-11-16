function setCancellableTimeout(callback, delay = 0, ...args) {
    const timeoutId = setTimeout(callback, delay, ...args);
    return () => clearTimeout(timeoutId);
}

let i = 0;
const cancel = setCancellableTimeout(() => {
  i++;
  console.log(i);
}, 100);

setTimeout(cancel, 50); // Cancels the timeout after 50ms