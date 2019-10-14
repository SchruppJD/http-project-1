const http = require('http');
const url = require('url');
const responseHandler = require('./cloneArchive.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Redirects request
const urlStruct = {

  GET: {
    '/': responseHandler.getIndex,
    '/style.css': responseHandler.getCSS,
    '/getClone': responseHandler.getClone,
    notFound: responseHandler.getNotFound,
  },

  HEAD: {
    '/getClone': responseHandler.getCloneMeta,
    notFound: responseHandler.getNotFoundMeta,
  },

  POST: {
    '/addClone': responseHandler.handlePost,
  },

};

const onRequest = (request, response) => {
  console.log(request.url);

  // Parse the url
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' header
  // const acceptedType = request.headers.accept;


  if (urlStruct[request.method][parsedUrl.pathname]) {
    if (parsedUrl.search) {
      urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl.search);
    } else {
      urlStruct[request.method][parsedUrl.pathname](request, response);
    }
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
