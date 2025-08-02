const db = require("./config");

module.exports = function () {
  return new Promise((resolve, reject) => {
    const seedDatabase = function () {
      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();
    };

    try {
      db.serialize(function () {
        db.run("CREATE TABLE lorem (info TEXT)", function (e) {
          if (e !== undefined) {
            db.all("SELECT COUNT(*) FROM lorem", function (err, rows) {
              if (err) {
                console.error("Error checking table data:", err);
                return reject(err);
              }
              
              const rowsCount = rows[0]["COUNT(*)"];
              if (rowsCount <= 0) {
                console.log("seeding data ...");
                seedDatabase();
              }
              
              // After seeding, show current content and resolve
              db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
                if (err) {
                  console.error("Error reading seeded data:", err);
                } else {
                  console.log("Current content in lorem table:");
                  console.log(row.id + ": " + row.info);
                }
              }, function (err, numRows) {
                // This callback is called when all rows have been processed
                if (err) {
                  console.error("Error completing seed operation:", err);
                  reject(err);
                } else {
                  console.log(`✅ Database seeding completed successfully! ${numRows} rows found.`);
                  resolve();
                }
              });
            });
          } else {
            // Table already exists, just show content and resolve
            db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
              if (err) {
                console.error("Error reading existing data:", err);
              } else {
                console.log("Current content in lorem table:");
                console.log(row.id + ": " + row.info);
              }
            }, function (err, numRows) {
              if (err) {
                console.error("Error reading existing data:", err);
                reject(err);
              } else {
                console.log(`✅ Database already exists with ${numRows} rows.`);
                resolve();
              }
            });
          }
        });
      });
    } catch (e) {
      console.error("Error during database seeding:", e);
      reject(e);
    }
  });
};
