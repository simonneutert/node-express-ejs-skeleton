var ejs = require('ejs')

module.exports = function(filename, data, options) {
  var html = fileRenderHelper(filename, data, options)
  if (html === undefined) {
    html = fileRenderHelper('./views/' + filename, data, options)
  }
  return html
}

let fileRenderHelper = (filename, data, options) => {
  var html
  ejs.renderFile(filename, data, options, function(err, str) {
    if (err) {
      // console.log(err)
    } else {
      // console.log(str)
      html = str
    }
  })
  return html
}
