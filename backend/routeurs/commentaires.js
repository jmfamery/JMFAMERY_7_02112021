// Routeur sur la gestion des commentaires
const express = require('express');
const routeur = express.Router();
const CommentairesCtrl = require('../controleurs/commentaires.js');
const authentification = require('../intergiciel/authentification.js');

routeur.post('/creationCommentaire', authentification, CommentairesCtrl.creationCommentaire);
routeur.delete('/supressionCommentaire/:id', authentification, CommentairesCtrl.supressionCommentaire);
routeur.get('/envoiCommentaireUnArticle/:id', authentification, CommentairesCtrl.envoiCommentaireUnArticle);

module.exports = routeur;