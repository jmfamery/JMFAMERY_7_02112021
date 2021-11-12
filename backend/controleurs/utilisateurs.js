// Gestion de l'accès d'un utilisateur
const cryptage = require('bcrypt');
const authentification = require('jsonwebtoken');
const Utilisateur = require('../modeles/utilisateurs.js');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

const utilisateur = new Utilisateur();

// Création d'un utilisateur
exports.inscrire = (req, res, next) => {
  cryptage.hash(req.body.mot_passe, 10)
    .then(hash => {
      const donnees = [req.body.email, hash, req.body.nom, req.body.prenom, req.body.moderateur]
      utilisateur.inscrire(donnees)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// contrôle d'accès d'un utilisateur
exports.connexion = (req, res, next) => {
  utilisateur.connexion(req.body.email)
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      cryptage.compare(req.body.mot_passe, utilisateur.mot_passe)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            utilisateur: utilisateur.id,
            token: authentification.sign(
              { utilisateurId: utilisateur._id },
              codeSecurite,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ message: error }));
    })
    .catch(error => res.status(500).json({ message: error }));
};

exports.suppression = (req, res, next) => {
  utilisateur.suppression(req.body.id)
      .then((response) =>{
          res.status(200).json(JSON.stringify(response))
      })
      .catch((error) =>{
          console.log(error);
          res.status(400).json(error)
      })
} 