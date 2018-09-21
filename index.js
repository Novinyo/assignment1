/*
 *  Assignment #1 a simple restful API
 *  that return a simple message to the user
 *  this is the entry point of the project
*/
// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {
         // GET url & parse it
    const parsedUrl = url.parse(req.url, true);

    // GET the route path
    const path = parsedUrl.pathname;
    const routePath = path.replace(/^\/+|\/+$/g,'');

    // get http headers
    const headers = req.headers;

    // Get the payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', ()=> {
        buffer += decoder.end();

        // choose the route the request should go to
        const getRoute = typeof(router[routePath]) !== 'undefined' 
                                ? router[routePath]
                                : routes.notFound;
        // construct data object ot send to route
        var data = {
            'headers': headers,
            'payload': buffer
        };

        // route the request to the route specified in the router
        getRoute(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // convert payload to string
            const payloadString = JSON.stringify(payload);

            // return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);

            res.end(payloadString);
        });

    });
});

server.listen('6000', () => {
    console.log(`server running on port 6000`);
});

const routes = {};

 routes.hello = (data, callback) => {
    callback(200, {'message': 'Hello word'});
 };

 routes.notFound = (data, callback) => {
    callback(404, {'message': 'URL not found'});
}
const router = {
    'hello': routes.hello
};
