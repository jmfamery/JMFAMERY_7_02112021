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
            { 
              id: data[0].id,
              moderateur: data[0].moderateur
            },
            codeSecurite,
            { expiresIn: '24h' }
          )
        });
      })
      .catch((error) => res.status(500).json({ error }));
    })
}

// modification d'un utilisateur
exports.modification = (req, res) => {
  console.log("modification Backend");
  let sql = 'UPDATE utilisateur SET moderateur = ? WHERE id = ?'
  const donnees = [req.body.moderateur, req.params.id]
  baseDonnees.query(sql, donnees, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ err: "La modification n'a pas été fait" });
      }
      res.status(200).json({ message: "la position moderateur a été modifié !" })
    })
  }

// Envoi d'une Article
exports.envoiUnUtilisateur = (req, res) => {
  let sql = 'SELECT nom, prenom FROM utilisateur WHERE id = ?'
  baseDonnees.query(sql, req.params.id, (err, data) => {
      if (err) {
          return res.status(500).json(err.message);
      };
      if (data.length == 0) {
          return res.status(400).json({ message: "Aucun utilisateur à afficher !" });
      }
      res.status(200).json(data);
  })
}

// suppression d'un utilisateur
exports.suppression = (req, res) => {
  console.log("suppression Utilisateur")
  let sql = 'DELETE FROM utilisateur WHERE id = ?';
  baseDonnees.query(sql, req.params.id, (err) => {
    if (err) {
      return res.status(400).json({ err: "La suppression du compte n'a pas été fait" });
    } 
      res.status(200).json({ message: "Votre compte a été supprimé !" })
    })
}