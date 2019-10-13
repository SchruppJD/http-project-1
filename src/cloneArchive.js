const fs = require('fs'); // File System

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
    Number: 'Unknown',
    Rank: 'Private',
    Unit: 'Torrent Company',
  },

  boomer: {
    Number: 'CS-2207',
    Rank: 'Sergeant',
    Unit: '501st',
    Role: 'ARF Trooper',
  },

  boro: {
    Number: 'Unknown',
    Rank: 'Private',
    Unit: 'Torent Company',
    Role: 'First Aid Specialist',
  },

  bow: {
    Number: 'Unknown',
    Rank: 'Commander',
    Unit: '501st',
  },

};

const getClone = (request, response, search) => {
   if(search && cloneArchive[search.split("=")[1]]){
      let clone = cloneArchive[search.split("=")[1]]
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const stringMessage = JSON.stringify(clone);
      response.write(stringMessage);
      response.end();
   }
   else {
      const badRequest = {
      message: 'Missing valid query parameter. query = ?*="Name of Clone" ',
      id: 'badRequest',
      };
      const stringMessage = JSON.stringify(badRequest);
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(stringMessage);
      response.end();
   }
}


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

module.exports = {
  getIndex,
  getCSS,
  getClone,
  getNotFound,
};
