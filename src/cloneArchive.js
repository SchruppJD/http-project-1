const fs = require('fs'); // File System
// querystring module for parsing querystrings from url
const query = require('querystring');

// Load Pages
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCSS = fs.readFileSync(`${__dirname}/../client/style.css`);

const cloneArchive = {

  template: {
    Number: 'Unknown',
    Rank: 'Unknown',
    Unit: 'Unknown',
  },

  appo: {
    Name: 'Appo',
    Number: 'CC-1110',
    Rank: 'Senior Commander',
    Unit: '501st',
  },

  ayar: {
      Name: 'Ayar',
    Number: 'Unknown',
    Rank: 'Private',
    Unit: 'Torrent Company',
  },

  boomer: {
      Name: 'Boomer',
    Number: 'CS-2207',
    Rank: 'Sergeant',
    Unit: '501st',
    Role: 'ARF Trooper',
  },

  boro: {
      Name: 'Boro',
    Number: 'Unknown',
    Rank: 'Private',
    Unit: 'Torent Company',
    Role: 'First Aid Specialist',
  },

  bow: {
      Name: 'Bow',
    Number: 'Unknown',
    Rank: 'Commander',
    Unit: '501st',
  },

};

// /Respond JSON

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log(status);
  response.writeHead(status, headers);
  response.end();
};

// Respond JSON

// /GET Requests

const getClone = (request, response, search) => {
  if (search && cloneArchive[search.split('=')[1]]) {
    const clone = cloneArchive[search.split('=')[1]];
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const stringMessage = JSON.stringify(clone);
    response.write(stringMessage);
    response.end();
  } else {
    const badRequest = {
      message: 'Missing valid query parameter. query = ?*="Name of Clone" ',
      id: 'badRequest',
    };
    const stringMessage = JSON.stringify(badRequest);
    response.writeHead(400, { 'Content-Type': 'application/json' });
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

const getNotFound = (request, response) => {
  const notFound = {
    message: 'Page Requested not Found.',
    id: 'notFound',
  };
  const stringMessage = JSON.stringify(notFound);
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(stringMessage);
  response.end();
};

// GET Requests

// / HEAD requests


const getCloneMeta = (request, response, search) => {
  if (search) {
    if (cloneArchive[search.split('=')[1]]) {
      return respondJSONMeta(request, response, 200);
    }
    return respondJSONMeta(request, response, 400);
  }
  return respondJSONMeta(request, response, 400);
};

const getNotFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// HEAD Requests

// /POST Requests


const addClone = (request, response, body) => {
  console.log('addClone');
  // default json message
  const responseJSON = {
    message: 'Require atleast Clone Name or Number',
  };

  // Check for fields
  if (!body.name && !body.number) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }
  let identifier = '';
  if (body.name) {
    identifier = body.name;
  } else {
    identifier = body.number;
  }

  // default status code to 201 created
  let responseCode = 201;
  // If already Exists, update
  if (cloneArchive[identifier]) {
    console.log('Update');
    responseCode = 204;
  } else {
    console.log('Create New');
    // Else Create new object
    cloneArchive[identifier] = {};
  }

  console.log(identifier);
  console.log(cloneArchive[identifier]);

  // Add/Update fields
  cloneArchive[identifier].Name = body.name;
  cloneArchive[identifier].Number = body.number;
  cloneArchive[identifier].Rank = body.rank;
  cloneArchive[identifier].Unit = body.unit;

  console.log(identifier);
  console.log(cloneArchive[identifier]);
  // If response is created, set and send our created message
  if (responseCode === 201) {
    return respondJSON(request, response, responseCode, cloneArchive[identifier]);
  }
  // 204 has no body, just success

  return respondJSONMeta(request, response, responseCode);
};

const handlePost = (request, response) => {
  console.log('Handling POST');
  // Recieve POST Data
  const res = response;

  // To reassemble byte stream
  const body = [];

  // on Error
  request.on('error', (err) => {
    console.dir(err);
    console.log(err);
    res.statusCode = 400;
    res.end();
  });

  // on Data (each byte)
  // add to byte array
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    // combine byte array via buffer.concat
    // Convert to string
    const bodyString = Buffer.concat(body).toString();
    // Parse string into obj by field name
    const bodyParams = query.parse(bodyString);

    // pass to our addUser function
    addClone(request, res, bodyParams);
  });
};

// POST Requests

module.exports = {
  // GET
  getIndex,
  getCSS,
  getClone,
  getNotFound,

  // HEAD
  getCloneMeta,
  getNotFoundMeta,

  // POST
  handlePost,
};
