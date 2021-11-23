// Modèle de la base de données d'un utilisateur
const baseDonnees = require('../applications.js');
const mysql = require('mysql');
const chiffrer = require('bcrypt');
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
        if (!res[0]) {
          reject({
            error: 'Utilisateur inconnu!'
          })
        } {
          chiffrer.compare(mot_passe, res[0].mot_passe)
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
              }, 
                console.log("Mot de passe correct !"),
                console.log(res[0])
              );
            })
            .catch(error => reject({ error }));
          }
      })      
    })
  }

  suppression(donnees) {
    let sql = 'DELETE FROM utilisateur WHERE id = ?';
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