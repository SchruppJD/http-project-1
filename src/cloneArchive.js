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

// const getClone = (request, response) => {
//    let clone = request.
//    response.writeHead(200, { 'Content-Type': 'application/json' });
//    const stringMessage = JSON.stringify(cloneArchive[clone]);
//    response.write(stringMessage);
//    response.end();
// }


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

const getAppo = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const stringMessage = JSON.stringify(cloneArchive.appo);
  response.write(stringMessage);
  response.end();
};

const getAyar = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const stringMessage = JSON.stringify(cloneArchive.ayar);
  response.write(stringMessage);
  response.end();
};

const getBoomer = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const stringMessage = JSON.stringify(cloneArchive.boomer);
  response.write(stringMessage);
  response.end();
};

const getBoro = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const stringMessage = JSON.stringify(cloneArchive.boro);
  response.write(stringMessage);
  response.end();
};

const getBow = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const stringMessage = JSON.stringify(cloneArchive.bow);
  response.write(stringMessage);
  response.end();
};


module.exports = {
  getIndex,
  getCSS,
  getAppo,
  getAyar,
  getBoomer,
  getBoro,
  getBow,
};
