const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.url === '/' && request.method === 'GET') {
        // root, GET
        fs.readFile('../public/index.html', 'utf8', (err, data) => {
            if (err) return console.log(err.message);

            response.write(data);
            response.end();
        });
    } else {
        // bad request
        let badReqMsg = '<pre style="color: red">bad request</pre> <pre><b>use case</b>: root</pre>';

        response.write(badReqMsg);
        response.end();
    }
}).listen('8000');

console.log('server is runing on :8000 ...');