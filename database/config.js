// POSTGRESQL
//var pgp = require('pg-promise')( /* options */ )
//var db = pgp('postgres://username:password@host:port/database')

// SQLITE3
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database/demo.db')

module.exports = db
