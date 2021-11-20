// Gestion de l'accès d'un utilisateur
const cryptage = require('bcrypt');
const { response } = require('express');
const authentification = require('jsonwebtoken');
const Utilisateur = require('../modeles/utilisateurs.js');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

const utilisateur = new Utilisateur();

// Création d'un utilisateur
exports.inscrire = (req, res, next) => {
  console.log("inscrire Backend")
  console.log(req.body.mot_passe)
  cryptage.hash(req.body.mot_passe, 10)
    .then(hash => {
      const donnees = [req.body.email, hash, req.body.nom, req.body.prenom, req.body.moderateur]
      utilisateur.inscrire(donnees)
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

// contrôle d'accès d'un utilisateur
exports.connexion = (req, res, next) => {
  console.log("connexion Backend")
  utilisateur.connexion(req.body.email, req.body.mot_passe)
    .then(() => res.status(200).json({
      message: 'Mot de passe valider !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
    // .then(utilisateur => {
    //   if (!utilisateur) {
    //     return res.status(401).json({
    //       error: 'Utilisateur non trouvé !'
    //     });
    //   }
    //   console.log("body : ",req.body.mot_passe," utilisateur : ",utilisateur.mot_passe)
    //   console.log("Tous utilisateur : ",utilisateur)
    //   console.log("Utilisateur json : ",JSON.stringify(utilisateur))
    //   let test = JSON.stringify(utilisateur)
    //   console.log("test : ",test)
    //   console.log("result : ",donnees)
    //   cryptage.compare(req.body.mot_passe, utilisateur.mot_passe)
    //     .then(valid => {
    //       if (!valid) {
    //         return res.status(401).json({
    //           error: 'Mot de passe incorrect !'
    //         });
    //       }
    //       res.status(200).json({
    //         utilisateur: utilisateur.id,
    //         email: utilisateur.email,
    //         nom: utilisateur.nom,
    //         prenom: utilisateur.prenom,
    //         moderateur: utilisateur.moderateur,
    //         token: authentification.sign({
    //             id: utilisateur.id
    //           },
    //           codeSecurite, {
    //             expiresIn: '24h'
    //           }
    //         )
    //       });
    //     })
    //     .catch(error => {res.status(500).json({
    //       message: error
    //     })},
    //       console.log("Impossible de vérifier mot de passe")
    //     );
    // })
    // .catch(error => {res.status(500).json({
    //   message: error
    // })},
    //   console.log("erreur de profil")
    // );
};

exports.suppression = (req, res, next) => {
  utilisateur.suppression(req.body.id)
    .then((response) => {
      res.status(200).json(JSON.stringify(response))
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error)
    })
}