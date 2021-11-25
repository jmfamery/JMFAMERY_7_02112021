const authentification = require('jsonwebtoken');
//const baseDonnees = require('../applications.js');

//authentification de l'utilisateur
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

module.exports = (req, res, next) => {
  console.log("Authentification")
  console.log(req.headers.authorization)
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoderToken = authentification.verify(token, codeSecurite);
    // const utilisateurId = decoderToken.utilisateurId;
    // const sqlId = [utilisateurId];
    console.log("donnees : ",token, decoderToken)
    // let sql = 'SELECT COUNT(id) FROM utilisateur WHERE id=?';
    // baseDonnees.query(sql, sqlId,(err, res) => {
    //   if (err) reject({error : 'Erreur dans l\'inscription'});
    //   if (res[0]['COUNT(id)'] !== 1) {
    //       throw 'Token invalide';
    //   } else {
    //       next();
    //   }
    // })
  } catch (error) {
    res.status(401).json({message: 'Requête invalide!'});
  }
};