const db = require("./config");

module.exports = function () {
  return new Promise((resolve, reject) => {
    // Helper function to display table contents
    const displayTableContents = (callback) => {
      console.log("📋 Current lorem table contents:");
      db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
        if (err) {
          console.error("❌ Error reading row:", err);
        } else {
          console.log(`  ${row.id}: ${row.info}`);
        }
      }, function (err, numRows) {
        if (err) {
          console.error("❌ Error completing table read:", err);
          return callback(err);
        }
        console.log(`📊 Total rows found: ${numRows}`);
        callback(null, numRows);
      });
    };

    // Helper function to seed data
    const insertSeedData = () => {
      return new Promise((resolve, reject) => {
        console.log("🌱 Inserting seed data...");
        const stmt = db.prepare("INSERT INTO lorem VALUES (?)");

        try {
          for (let i = 0; i < 10; i++) {
            stmt.run(`Ipsum ${i}`);
          }
          stmt.finalize((err) => {
            if (err) {
              console.error("❌ Error finalizing insert statement:", err);
              reject(err);
            } else {
              console.log("✅ Seed data inserted successfully!");
              resolve();
            }
          });
        } catch (error) {
          console.error("❌ Error during data insertion:", error);
          reject(error);
        }
      });
    };

    // Main execution flow
    console.log("🔄 Starting database initialization...");

    db.serialize(() => {
      // Step 1: Try to create table (will fail silently if exists)
      db.run(
        "CREATE TABLE IF NOT EXISTS lorem (info TEXT)",
        function (createErr) {
          if (createErr) {
            console.error("❌ Error creating table:", createErr);
            return reject(createErr);
          }

          console.log("✅ Table 'lorem' is ready");

          // Step 2: Check if table has data
          db.all(
            "SELECT COUNT(*) as count FROM lorem",
            function (countErr, rows) {
              if (countErr) {
                console.error("❌ Error checking table data:", countErr);
                return reject(countErr);
              }

              const rowCount = rows[0].count;
              console.log(`📊 Found ${rowCount} existing rows`);

              // Step 3: Seed data if table is empty
              if (rowCount === 0) {
                insertSeedData()
                  .then(() => {
                    // Step 4: Display final contents and resolve
                    displayTableContents((err, numRows) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log(
                          "🎉 Database initialization completed successfully!",
                        );
                        resolve();
                      }
                    });
                  })
                  .catch((seedErr) => {
                    console.error("❌ Error seeding data:", seedErr);
                    reject(seedErr);
                  });
              } else {
                console.log(
                  "ℹ️  Table already contains data, skipping seeding",
                );

                // Step 4: Display final contents and resolve
                displayTableContents((err, numRows) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log(
                      "🎉 Database initialization completed successfully!",
                    );
                    resolve();
                  }
                });
              }
            },
          );
        },
      );
    });
  });
};
