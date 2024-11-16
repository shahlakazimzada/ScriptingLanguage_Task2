function promisify(fn) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };
}

// Example Usage
function foo(url, options, callback) {
    setTimeout(() => callback(null, 'Data from ' + url), 1000); // Simulate async
}

const promisifiedFoo = promisify(foo);

async function getData() {
    const data = await promisifiedFoo('example.com', { foo: 1 });
    console.log(data); // Logs 'Data from example.com' after 1 second
}

getData();