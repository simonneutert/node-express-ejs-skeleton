var yieldContent = require('./yield-content')

module.exports = {
  configuration: {
    html: {
      lang: 'de',
      dir: 'ltr',
      header: {
        title: 'Edit Default Meta Title Here'
      }
    },
    rows: '',
    row: '',
    data: '',
    file: 'index.ejs'
  },
  yield: yieldContent,
  merge: function(b) {
    return Object.assign(this, b)
  }
}
