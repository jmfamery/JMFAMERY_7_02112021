const express = require('express');
const routeur = express.Router();

const authentification = require('../intergiciel/authentification.js');
const telechargement = require('../intergiciel/telechargement.js');

const ArticlesCtrl = require('../controleurs/articles.js');

// Routeur sur la gestion de la Article
routeur.post('/', authentification, telechargement, ArticlesCtrl.creationArticle);
routeur.delete('/:id', authentification, ArticlesCtrl.supressionArticle);
routeur.get('/:id', authentification, ArticlesCtrl.envoiUnArticle);
routeur.get('/', authentification, ArticlesCtrl.envoiTousArticles);

module.exports = routeur;