// Routeur sur la gestion des commentaires
const express = require('express');
const routeur = express.Router();
const CommentairesCtrl = require('../controleurs/commentaires.js');
const authentification = require('../intergiciel/authentification.js');

routeur.post('/creationCommentaire', authentification, CommentairesCtrl.creationCommentaire);
routeur.delete('/supressionTousCommentaires/:id', authentification, CommentairesCtrl.supressionTousCommentaires);
routeur.delete('/supressionUnCommentaire/:id', authentification, CommentairesCtrl.supressionUnCommentaire);
routeur.get('/envoiCommentaireUnArticle/:id', authentification, CommentairesCtrl.envoiCommentaireUnArticle);

module.exports = routeur;