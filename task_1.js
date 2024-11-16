function setCancellableInterval(callback, delay = 0, ...args) {
    const intervalId = setInterval(callback, delay, ...args);
    return () => clearInterval(intervalId);
}

let i = 0;
const cancelInterval = setCancellableInterval(() => {
  i++;
  console.log(i);
}, 1000);

// Call `cancelInterval()` after some time to stop it
setTimeout(cancelInterval, 5000);