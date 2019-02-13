const fs = require('fs');
const path = require('path');
const url = require('url');

const { get } = require('../lib/omdb');

function render(template, data, done) {
  fs.readFile( 
    path.join(__dirname, '..', 'public', `${template}.html`), 
    'utf-8',
    (error, file) => {
      if (error) return done(error);

      let html = file;
      
      for (let prop in  data) {
        if(data[prop] === 'N/A') data[prop] = '';
        const regexp = new RegExp(`{${prop}}`, 'g')
        html = html.replace(regexp, data[prop]);
      }
      done(null, html);
  })
}

function search(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');

  // const stream = fs.createReadStream(path.resolve('public', 'movie.html'));

  // stream.pipe(res);
  
  get(parsedUrl.query.title, (error, movie) => {
    if (error) return console.error(error);

    console.log(movie);
    
    render('movie', movie, (error, html) => {
      if (error) {
        res.writeHead(500, { 'Content-Type' : 'text/plain' });
        return res.end(error.message);
      }
      res.writeHead(200, { 'Content-Type' : 'text/html' });
      res.end(html);
    })
  });


  

  
  
}

module.exports = search;