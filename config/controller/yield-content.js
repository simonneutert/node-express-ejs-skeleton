const ejs = require("ejs");

module.exports = function (filename, data, options) {
  let html = fileRenderHelper(filename, data, options);
  if (html === undefined) {
    html = fileRenderHelper("./views/" + filename, data, options);
  }
  return html;
};

const fileRenderHelper = (filename, data, options) => {
  let html;
  ejs.renderFile(filename, data, options, function (err, str) {
    if (err) {
      // console.log(err)
    } else {
      // console.log(str)
      html = str;
    }
  });
  return html;
};
