const fs = require('fs'); // File System

// Load Pages
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCSS = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to send response
// const respond = (request, response, content, type, status) => {
//  // set status code (200 success) and content type
//  response.writeHead(status, { 'Content-Type': type });
//  // write the content string or buffer to response
//  response.write(content);
//  // send the response to the client
//  response.end();
// };


const getSuccess = (request, response, type) => {
  const success = {
    message: 'This is a successful response',
  };
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${success.message}</message>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
    response.end();
  } else {
    const stringMessage = JSON.stringify(success);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(stringMessage);
    response.end();
  }
};

const getBadRequest = (request, response, type, search) => {
  if (search === '?valid=true') {
    const badRequest = {
      message: 'This is a successful response',
    };

    if (type === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${badRequest.message}</message>`;
      responseXML = `${responseXML} </response>`;

      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(responseXML);
      response.end();
    } else {
      const stringMessage = JSON.stringify(badRequest);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(stringMessage);
      response.end();
    }
  } else {
    const badRequest = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };
    if (type === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${badRequest.message}</message>`;
      responseXML = `${responseXML} <id>${badRequest.id}</id>`;
      responseXML = `${responseXML} </response>`;

      response.writeHead(400, { 'Content-Type': 'text/xml' });
      response.write(responseXML);
      response.end();
    } else {
      const stringMessage = JSON.stringify(badRequest);
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(stringMessage);
      response.end();
    }
  }
};

const getUnauthorized = (request, response, type, search) => {
  if (search === '?loggedIn=yes') {
    const unauthorized = {
      message: 'This is a successful response',
    };
    if (type === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${unauthorized.message}</message>`;
      responseXML = `${responseXML} </response>`;

      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(responseXML);
      response.end();
    } else {
      const stringMessage = JSON.stringify(unauthorized);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(stringMessage);
      response.end();
    }
  } else {
    const unauthorized = {
      message: 'Missing loggedIn query parameter set to yes',
      id: 'unauthorized',
    };
    if (type === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${unauthorized.message}</message>`;
      responseXML = `${responseXML} <id>${unauthorized.id}</id>`;
      responseXML = `${responseXML} </response>`;

      response.writeHead(401, { 'Content-Type': 'text/xml' });
      response.write(responseXML);
      response.end();
    } else {
      const stringMessage = JSON.stringify(unauthorized);
      response.writeHead(401, { 'Content-Type': 'application/json' });
      response.write(stringMessage);
      response.end();
    }
  }
};

const getForbidden = (request, response, type) => {
  const forbidden = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${forbidden.message}</message>`;
    responseXML = `${responseXML} <id>${forbidden.id}</id>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(403, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
    response.end();
  } else {
    const stringMessage = JSON.stringify(forbidden);
    response.writeHead(403, { 'Content-Type': 'application/json' });
    response.write(stringMessage);
    response.end();
  }
};

const getInternal = (request, response, type) => {
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${internal.message}</message>`;
    responseXML = `${responseXML} <id>${internal.id}</id>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(500, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
    response.end();
  } else {
    const stringMessage = JSON.stringify(internal);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.write(stringMessage);
    response.end();
  }
};

const getNotImplemented = (request, response, type) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${notImplemented.message}</message>`;
    responseXML = `${responseXML} <id>${notImplemented.id}</id>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(501, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
    response.end();
  } else {
    const stringMessage = JSON.stringify(notImplemented);
    response.writeHead(501, { 'Content-Type': 'application/json' });
    response.write(stringMessage);
    response.end();
  }
};

const getNotFound = (request, response, type) => {
  const notFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${notFound.message}</message>`;
    responseXML = `${responseXML} <id>${notFound.id}</id>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(404, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
    response.end();
  } else {
    const stringMessage = JSON.stringify(notFound);
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(stringMessage);
    response.end();
  }
};


const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styleCSS);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
