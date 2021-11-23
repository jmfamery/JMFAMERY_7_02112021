// Connection à la base de données
const mysql = require('mysql');
require('dotenv').config();
const host = process.env.DB_host;
const user = process.env.DB_user;
const password = process.env.DB_password;
const database = process.env.DB_database;

const baseDonnees = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

baseDonnees.connect(function (err) {
  if (err) {
    console.error('Impossible de se connecter!');
    return;
  }
  console.log('Connecté à la base de données MySQL!');
});

module.exports = baseDonnees;

// Echange avec le serveur
const express = require('express');
const appliExpress = express();
const chemin = require('path');
const saucesRouteurs = require('./routeurs/sauces.js');
const utilisateurRouteurs = require('./routeurs/utilisateurs.js');
const helmet = require('helmet');
const hpp = require('hpp');

appliExpress.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

appliExpress.use(express.json());

appliExpress.use('/images', express.static(chemin.join(__dirname, 'images')));

appliExpress.use('/api/sauces', saucesRouteurs);
appliExpress.use('/api/utilisateur', utilisateurRouteurs);

appliExpress.use(helmet()); // Sécurité : il définit des en-têtes de réponse HTTP
appliExpress.use(hpp()); // Sécurité : il évite les attaques de pollution des paramètres HTTP

module.exports = appliExpress;

// Sécurité : il nettoie les entrées utilisateur provenant du corps de la requête
const xssClean = require('xss-clean');
const clean = require('xss-clean/lib/xss').clean
const cleaned = clean('<script></script>')