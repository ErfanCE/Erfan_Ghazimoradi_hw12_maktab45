const http = require('http');

http.createServer((request, response) => {
    if (request.url === '/' && request.method === 'GET') {
        // root, GET
        response.write('Hello World!!');
        response.end();
    } else {
        // bad request
        let badReqMsg = '<pre style="color: red">bad request</pre> <pre><b>use case</b>: root</pre>';

        response.write(badReqMsg);
        response.end();
    }
}).listen('8000');

console.log('server is runing on :8000 ...');