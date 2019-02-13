const url = require('url');

const { get } = require('../lib/omdb');



function search(req, res) {
  const parsedUrl = url.parse(req.url, true);

  get(parsedUrl.query.title, (error, movie) => {
    if (error) {
      return res.render('error.html', {error: error.message});
    }   
    res.render('movie.html', movie);
  }); 
}

module.exports = search;