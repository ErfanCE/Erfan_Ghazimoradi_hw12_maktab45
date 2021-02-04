const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
                rootHtml(response);
                break;
            case '/style.css':
                rootCss(response);
                break;
            case '/main.js':
                rootMain(response);
                break;
            case '/login-bg.jpg':
                rootBgImage(response);
                break;
            default:
                badRequest(response);
                break;
        }
    } else {
        send404response(response);
    }
}).listen('8000');

console.log('server is runing on :8000 ...');

// root, GET
function rootHtml(response) {
    fs.readFile('../public/index.html', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /user, GET
function rootCss(response) {
    fs.readFile('../public/style.css', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /routes, GET
function rootMain(response) {
    fs.readFile('../public/main.js', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /contact, GET
function rootBgImage(response) {
    fs.readFile('../public/login-bg.jpg', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /bad request, GET
function badRequest(response) {
    let badReqMsg = '<pre style="color: red">Not Found!</pre> <pre><b>use case</b>: <a href="/" style="text-decoration: none; color: #888">root</a></pre>';

    response.write(badReqMsg);
    response.end();
}