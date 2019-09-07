const request = require('request-promise');
request.debug = 1;

(async () => {
    try {
        let status = await request({
            uri: 'https://httpbin.org/status/350',
            resolveWithFullResponse: true
        });
    } catch(response) {
        if(response.statusCode === 300) {
            console.log('Everything ok');
        } else {
            console.log(`Something went wrong: ${response}`);
            process.exit();
        }
    }
})();