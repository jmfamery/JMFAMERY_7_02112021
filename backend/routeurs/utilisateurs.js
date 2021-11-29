// Routeur sur la gestion de l'utilisateur
const express = require('express');
const routeur = express.Router();
const utilisateurCtrl = require('../controleurs/utilisateurs.js');
//const authentification = require('../intergiciel/authentification');
const maximum = require('../intergiciel/connexion.js');

routeur.post('/inscrire', utilisateurCtrl.inscrire);
routeur.post('/connexion', maximum.limiteConnexion , utilisateurCtrl.connexion);
routeur.delete('/suppression', utilisateurCtrl.suppression)

module.exports = routeur;