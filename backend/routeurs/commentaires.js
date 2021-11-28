const express = require('express');
const routeur = express.Router();

const authentification = require('../intergiciel/authentification.js');

const CommentairesCtrl = require('../controleurs/commentaires.js');

// Routeur sur la gestion de la Commentaire
routeur.post('/', authentification, CommentairesCtrl.creationCommentaire);
routeur.delete('/:id', authentification, CommentairesCtrl.supressionCommentaire);
routeur.get('/:id', authentification, CommentairesCtrl.envoiUnCommentaire);

module.exports = routeur;