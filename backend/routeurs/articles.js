// Routeur sur la gestion des articles
const express = require('express');
const routeur = express.Router();
const articlesCtrl = require('../controleurs/articles.js');
const authentification = require('../intergiciel/authentification.js');
const telechargement = require('../intergiciel/telechargement.js');

routeur.post('/creationArticle', authentification, telechargement, articlesCtrl.creationArticle);
routeur.delete('/suppressionArticle/:id', authentification, articlesCtrl.supressionArticle);
routeur.get('/envoiUnArticle/:id', authentification, articlesCtrl.envoiUnArticle);
routeur.get('/envoiTousArticles', authentification, articlesCtrl.envoiTousArticles);

module.exports = routeur;