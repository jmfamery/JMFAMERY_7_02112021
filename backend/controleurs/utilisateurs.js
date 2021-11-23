// Gestion de l'accès d'un utilisateur
const chiffrer = require('bcrypt');
const authentification = require('jsonwebtoken');
const baseDonnees = require('../applications.js');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

// Création d'un utilisateur
exports.inscrire = (req, res) => {
  console.log("inscrire Backend");
  chiffrer.hash(req.body.mot_passe, 10)
    .then(hash => {
      const donnees = [req.body.email, hash, req.body.nom, req.body.prenom, req.body.moderateur]
      let sql = 'INSERT INTO utilisateur (email, mot_passe, nom, prenom, moderateur) VALUES(?, ?, ?, ?, ?)'
      baseDonnees.query(sql, donnees, (err) => {
          if (err) {
            return res.status(400).json({ err });
          }
          let sql = 'SELECT * FROM utilisateur WHERE email = ?';
          baseDonnees.query(sql, req.body.email, (err, data) => {
              if (err) {
                return res.status(400).json({ err });
              }
              res.status(200).json({
                id: data[0].id,
                email: data[0].email,
                nom: data[0].nom,
                prenom: data[0].prenom,
                moderateur: data[0].moderateur,      
                token: authentification.sign(
                  { id: data[0].id },
                  codeSecurite,
                  { expiresIn: '24h' }
                )
              });
            })
        })
    })
    .catch((error) => res.status(500).json({ error }))
  }

// contrôle d'accès d'un utilisateur
exports.connexion = (req, res) => {
  console.log("connexion Backend")
  let sql = 'SELECT * FROM utilisateur WHERE email = ?'
  baseDonnees.query(sql, req.body.email, (err, data) => {
    if (data.length === 0) {
      return res.status(404).json({ err: "Utilisateur inconnu!" });
    }
    chiffrer.compare(req.body.mot_passe, data[0].mot_passe)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          id: data[0].id,
          email: data[0].email,
          nom: data[0].nom,
          prenom: data[0].prenom,
          moderateur: data[0].moderateur,          
          token: authentification.sign(
            { id: data[0].id },
            codeSecurite,
            { expiresIn: '24h' }
          )
        });
      })
      .catch((error) => res.status(500).json({ error }));
    })
}

exports.suppression = (req, res, next) => {
  console.log(req.body.id)
  utilisateur.suppression(req.body.id)
    .then(() => res.status(200).json({
      message: 'Profil supprimer !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}