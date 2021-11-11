const mysql = require('mysql');
require('dotenv').config();
const host = process.env.DB_host;
const user = process.env.DB_user;
const password = process.env.DB_password;
const database = process.env.DB_database;

// Connection à la base de données
const baseDonnees = mysql.createConnection({
    host: host,
    user: user, 
    password: password,
    database : database 
  });
 
  baseDonnees.connect(function(err) {
    if (err) {
      console.error('Pas connecté! à la base de données MySQL');
      return;
    }
    console.log('Connecté à la base de données MySQL!');
  });

module.exports = baseDonnees;