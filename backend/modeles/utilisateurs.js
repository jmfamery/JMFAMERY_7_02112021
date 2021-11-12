// Modèle de la base de données d'un utilisateur
const baseDonnees = require('../applications.js');
const mysql = require('mysql');

class Utilisateur {
  constructor() {
  }
  inscrire(donnees){
    let sql = 'INSERT INTO utilisateur VALUES(NULL, ?, ?, ?, ?, ?)';
    sql = mysql.format(sql, donnees);
    return new Promise((resolve, reject) =>{
        baseDonnees.query(sql, function(err, res){
            if (err) reject({error : 'Erreur dans l\'inscription'});
            resolve({message : 'Nouveau utilisateur !'})
        })
    })
  }

  connexion(donnees){
    let sql = 'SELECT * FROM utilisateur WHERE email = ?';
    sql = mysql.format(sql, donnees);    
    return new Promise((resolve, reject) =>{
        baseDonnees.query(sql, function(err, res){
            if (err) reject({ err });
            if (!res[0]){
                reject ({ error : 'Utilisateur inconnu!'});
            }
            resolve({message : 'Utilisateur trouvé!'}) 
        })
    
    })
  }

  suppression(donnees){
    let sql = 'DELETE FROM users WHERE id = ?'; 
    sql = mysql.format(sql,donnees);
    return new Promise((resolve, reject) =>{
        baseDonnees.query(sql, function(err, result){
            if (err) return reject({error : 'fonction indisponible'});
            resolve({message : 'Utilisateur supprimé'});
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