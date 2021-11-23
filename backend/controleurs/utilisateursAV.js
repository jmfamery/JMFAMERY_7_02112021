// Gestion de l'accès d'un utilisateur
const chiffrer = require('bcrypt');
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
  chiffrer.hash(req.body.mot_passe, 10)
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
    .then(() => {res.status(200).json({
      message: 'Mot de passe valider !'
        }),
        console.log(utilisateur)
      })
    .catch((error) => res.status(400).json({
      error
    }))
};

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