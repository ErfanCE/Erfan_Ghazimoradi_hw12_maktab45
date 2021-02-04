const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
                response.write('Hello Web Application');
                response.end();
                break;
            case '/about':
                aboutRoute(response);
                break;
            case '/user':
                userRoute(response);
                break;
            case '/routes':
                routesRoute(response);
                break;
            case '/contact':
                contactRoute(response);
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

// /about, GET
function aboutRoute(response) {
    let aboutHtml = '<pre style="color: #0b64bd; font-size: 18px"><b>About Me</b></pre>';

    response.write(aboutHtml);
    response.end();
}

// /user, GET
function userRoute(response) {
    fs.readFile('../public/users.json', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /routes, GET
function routesRoute(response) {
    fs.readFile('../public/routes.html', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /contact, GET
function contactRoute(response) {
    fs.readFile('../public/contact.html', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

// /bad request, GET
function badRequest(response) {
    let badReqMsg = '<pre style="color: red">Not Found!</pre> <pre><b>use case</b>: <a href="/routes" style="text-decoration: none; color: #888">/routes</a></pre>';
    
    response.write(badReqMsg);
    response.end();
}