const http = require('http');

http.createServer((request, response) => {
    response.write(request.url);
    response.end();
}).listen('8000');

console.log('server is runing on :8000 ...');