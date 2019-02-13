const http = require('http');
const render = require('./lib/render');

const { public,
        home,
        search,
        notFound } = require('./routes');

http.ServerResponse.prototype.render = render;

http.createServer( (req, res ) => {

  if( req.url.match(/\.(html|js|css|png|jpe?g|bmp|svg)$/) ) {
    public(req, res);
  } else if(req.url === '/') {
    home(req, res);
  } else if(req.url.startsWith('/search')) {
    search(req, res);
  } else {
    notFound(req, res);
  }

}).listen(3005, () => { console.log('Fileserver starded');
})

