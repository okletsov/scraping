const request = require('request-promise').defaults({
    proxy: 'http://5.58.52.231:8080'
    // Format:  http://username:password@ip:port
});

(async () => {
    let response = await request('https://httpbin.org/ip');
 
    console.log(response);
})();