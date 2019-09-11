const db = require('./config');

module.exports = function() {
  const seedDatabase = function() {
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }
    stmt.finalize()
  }

  try {
    db.serialize(function() {
      db.run('CREATE TABLE lorem (info TEXT)', function(e) {
        if (e !== undefined) {
          db.all('SELECT COUNT(*) FROM lorem', function(err, rows) {
            const rowsCount = rows[0]['COUNT(*)']
            if (rowsCount <= 0) {
              console.log("seeding data ...")
              seedDatabase()
            }
          })
        }
      })
    })
  } catch (e) {
    console.log(e)
  } finally {
    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
      console.log('Current content in lorem table:')
      if (err) {
        console.log(err)
      } else {
        console.log(row.id + ': ' + row.info)
      }
    })
  }

}
