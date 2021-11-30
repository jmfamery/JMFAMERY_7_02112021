const authentification = require('jsonwebtoken');
//const baseDonnees = require('../applications.js');

//authentification de l'utilisateur
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

module.exports = (req, res, next) => {
  console.log("Authentification")
  try {
    const token = req.headers.authorization;
    const decoderToken = authentification.verify(token, codeSecurite);
    next()
  } catch (error) {
    res.status(401).json({message: 'Requête invalide!'});
  }
};