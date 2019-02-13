const http = require('http');

function get(title, done) {
  const req = http.get(`http://www.omdbapi.com/?t=${title}&apikey=8d11691`, res => {
    if (res.statusCode !== 200) {
      done(new Error(`Ошибка: ${ress.statusMessage} (${ress.statusCode})`))
      res.resume();
      return;
    }


    res.setEncoding('utf-8');

    let body = '';

    res.on('data', data => body += data);
    res.on('end', () => {
      let result;

      try {
        result = JSON.parse(body);
      } catch (error) {
        done(error);
      }

      if (result.Response === 'False') {
        done(new Error(result.Error));
      }

      done(null, result);
    });
  });

  req.on('error', error => done(error));

}
module.exports = { get };