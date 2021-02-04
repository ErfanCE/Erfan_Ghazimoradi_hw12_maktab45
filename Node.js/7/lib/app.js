const http = require('http');
const fs = require('fs');
const { parse } = require('path');

// create server
http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
                reqUrlHandler('../public/index.html', response);
                break;
            case '/style.css':
                reqUrlHandler('../public/style.css', response);
                break;
            case '/js/main.js':
                reqUrlHandler('../public/js/main.js', response);
                break;
            case '/js/jquery-3.5.1.min.js':
                reqUrlHandler('../public/js/jquery-3.5.1.min.js', response);
                break;
            case '/Image/login-bg.jpg':
                reqUrlHandler('../public/Image/login-bg.jpg', response);
                break;
            case '/Fonts/woff/IRANSansWeb_Light.woff':
                reqUrlHandler('../public/Fonts/woff/IRANSansWeb_Light.woff', response);
                break;
            case '/icon/css/all.min.css':
                reqUrlHandler('../public/icon/css/all.min.css', response);
                break;
            case '/icon/webfonts/fa-solid-900.ttf':
                reqUrlHandler('../public/icon/webfonts/fa-solid-900.ttf', response);
                break;
            default:
                response.write('bad request');
                response.end();
                break;
        }
    } else if (request.method === 'POST' && request.url === '/login') {
        // post body
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            let user = {
                username: '',
                password: ''
            };

            body = parse(body);

            // username and password into array
            let userData = body.base.split('&');
            user.username = userData[0].substr(9);
            user.password = userData[1].substr(9);

            loginHandler(user, response);
        });
    }
}).listen('8000');

console.log('server is runing on :8000 ...');


function loginHandler(user, response) {
    fs.readFile('../public/json/users.json', 'utf8', (err, data) => {
        if (err) return console.log(err.message);

        usersData = JSON.parse(data);

        // empty input
        if (user.username === '' || user.password === '') {
            return loginSatus('empty', response);
        }

        // username exist
        for (const targetUser of usersData) {
            if (targetUser.username === user.username) {
                let result = (targetUser.password === user.password) ? ('success') : ('notMatch');
                return loginSatus(result, response);
            }
        }

        // username not exist
        return loginSatus('notFound', response);
    });
}

// handle request, GET
function reqUrlHandler(path, response) {
    fs.readFile(path, (err, data) => {
        if (err) return console.log(err.message);

        response.write(data);
        response.end();
    });
}

function loginSatus(status, response) {
    response.write(status);
    response.end();
}