const fs = require('fs');
const path = require('path');

function home(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const stream = fs.createReadStream(path.resolve('public', 'index.html'));

  stream.pipe(res);

  stream.on('error', error => {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404. Not found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(error.message);
    }
  });
  
}

module.exports = home;