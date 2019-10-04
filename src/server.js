const http = require('http');
const url = require('url');
const responseHandler = require('./cloneArchive.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Redirects request
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/appo': responseHandler.getAppo,
  '/ayar': responseHandler.getAyar,
  '/boomer': responseHandler.getBoomer,
  '/boro': responseHandler.getBoro,
  '/bow': responseHandler.getBow,

};

const onRequest = (request, response) => {
  console.log(request.url);

  // Parse the url
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' header
  // const acceptedType = request.headers.accept;

  // Check URL and call function if applicable, else index
  // let clone = parsedUrl.search;

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    // urlStruct.notFound(request, response, acceptedType);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
