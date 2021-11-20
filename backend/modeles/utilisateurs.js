// Modèle de la base de données d'un utilisateur
const baseDonnees = require('../applications.js');
const mysql = require('mysql');
const cryptage = require('bcrypt');
const authentification = require('jsonwebtoken');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

class Utilisateur {
  constructor() {}
  inscrire(donnees) {
    let sql = 'INSERT INTO utilisateur (email, mot_passe, nom, prenom, moderateur) VALUES(?, ?, ?, ?, ?)';
    sql = mysql.format(sql, donnees);
    return new Promise((resolve, reject) => {
      baseDonnees.query(sql, function (err, res) {
        if (err) reject({
          error: 'Erreur dans l\'inscription'
        });
        resolve({
          message: 'Nouveau utilisateur !'
        })
      })
    })
  }

  connexion(mail, mot_passe) {
    let sql = 'SELECT * FROM utilisateur WHERE email = ?';
    sql = mysql.format(sql, mail);
    return new Promise((resolve, reject) => {
      baseDonnees.query(sql, function (err, res) {
        console.log("mail : ",mail)
        console.log("sql : ",res[0].mot_passe)
        console.log("saisi : ",mot_passe)
        console.log("Id : ",res[0].id)
        if (!res[0]) {
          reject({
            error: 'Utilisateur inconnu!'
          })
        } {
          cryptage.compare(mot_passe, res[0].mot_passe)
            .then(valid => { 
              if (!valid) return reject({ error: 'Mot de passe incorrect !' });
              resolve({
                token: authentification.sign({
                    id: res[0].id
                  },
                  codeSecurite, {
                    expiresIn: '24h'
                  } 
                )
              }, console.log("Ok contrôle")
              );
            })
            .catch(error => reject({ error }));
          }
        // resolve({
        //   utilisateur: res[0]
        // })
      })      
    })
  }

  suppression(donnees) {
    let sql = 'DELETE FROM users WHERE id = ?';
    sql = mysql.format(sql, donnees);
    return new Promise((resolve, reject) => {
      baseDonnees.query(sql, function (err, result) {
        if (err) return reject({
          error: 'fonction indisponible'
        });
        resolve({
          message: 'Utilisateur supprimé'
        });
      })
    })
  }
}

module.exports = Utilisateur

// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// Modéle d'utilsateur avec sécutité
// const utilisateurSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// utilisateurSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('Utilisateur', utilisateurSchema);