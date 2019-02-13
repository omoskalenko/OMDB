const fs = require('fs');
const path = require('path');

function render(templateName, data, done) {
  fs.readFile( 
    path.resolve('views', templateName), 
    'utf-8',
    (error, template) => {
      if (error) return done(error);
      
      if (!data) return done(null, template);

      let html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
        const match = data[property]
        return match || placeholder;
      });;
      
      // for (let prop in  data) {
      //   if(data[prop] === 'N/A') data[prop] = '';
      //   const regexp = new RegExp(`{${prop}}`, 'g')
      //   html = html.replace(regexp, data[prop]);
      // }
      done(null, html);
  })
}

module.exports = render;