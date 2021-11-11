const authentification = require('jsonwebtoken');
require('dotenv').config();
const baseDonnees = require('../baseDonnees');
const mysql = require('mysql');
const codeSecurite = process.env.cleSecurite;

// authentification de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoderToken = authentification.verify(token, codeSecurite);
    const utilisateurId = decoderToken.utilisateurId;
    const insertSql = [utilisateurId];
    const sql = 'SELECT COUNT(id) FROM users WHERE id=?';
    sql = mysql.format(sql, insertSql)
    baseDonnees.query(sql, function(err, res) {
      if (err) reject({error : 'Erreur dans l\'inscription'});
      if (res[0]['COUNT(id)'] !== 1) {
          throw 'Token invalide';
      } else {
          next();
      }
    })
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !'});
  }
};

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoderToken = authentification.verify(token, codeSecurite);
//     req.utilisateurId = decoderToken.utilisateurId;
//     if (!req.utilisateurId) {
//       throw 'Utilisateur ID non valable !';
//     } 
//     next();
//   } catch (error) {
//     res.status(401).json({ error: error | 'Requête non authentifiée !'});
//   }
// };