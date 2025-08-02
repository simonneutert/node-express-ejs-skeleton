const express = require("express");
const controllerConfig = require("../config/controller/config");
const db = require("../database/config");

const router = express.Router();

router.get("/", function (req, res) {
  let controllerData = controllerConfig.merge({
    header: {
      title: "Index Page",
    },
    file: "index.ejs",
  });

  db.serialize(function () {
    db.all("SELECT * FROM lorem", function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        controllerData.rows = rows;
        res.render("application.ejs", controllerData);
      }
    });
  });
});

module.exports = router;
