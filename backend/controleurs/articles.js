const baseDonnees = require('../applications.js');
const sythemeFichier = require('fs');

// création d'une Article
exports.creationArticle = (req, res) => {
  const donnees = [
    req.body.titre,
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    req.body.contenue,
    req.body.id_createur,
    req.body.date_creation,
    req.body.id_commentaire
  ]
  let sql = 'INSERT INTO article (titre, image, contenue, id_createur, date_creation, id_commentaire) VALUES(?, ?, ?, ?, ?, ?)'
  baseDonnees.query(sql, donnees, (err, data) => {
    if (err) {
        res.status(500).json({ err })
    } else {
        res.status(201).json({ message: "Article crée !" })
    }
  })
};

// Suppression d'une Article
exports.supressionArticle = (req, res) => {
  let sql = 'SELECT id FROM article WHERE id = ?'
  baseDonnees.query(sql, req.body.id, (err, res) => {
    if (res > 0) {
      const filename = req.body.image.split('/images/')[1]
      sythemeFichier.unlink(`images/${filename}`, () => {
        let sql = 'DELETE INTO article WHERE id = ?'
        baseDonnees.query(sql, req.body.id, (err, data) => {
          if (err) {
            return res.status(500).json(err.message)
          }
          res.status(200).json({ message: "Article supprimé !" })
        })
      })
    }
  })  
  if (err) {
    return res.status(500).json(err.message)
  }
};

// Envoi d'une Article
exports.envoiUnArticle = (req, res) => {
  let sql = 'SELECT * FROM article WHERE id = ?'
  baseDonnees.query(sqlGetPost, req.body.id, (err, data) => {
      if (err) {
          return res.status(500).json(err.message);
      };
      if (data.length == 0) {
          return res.status(400).json({ message: "Aucun article à afficher !" });
      }
      res.status(200).json(data);
  });
};

// Envoi de toutes les Articles
exports.envoiTousArticles = (req, res) => {
  let sql = 'SELECT * FROM article'
  baseDonnees.query(sqlGetPost, req.body.id, (err, data) => {
      if (err) {
          return res.status(500).json(err.message);
      };
      if (data.length == 0) {
          return res.status(400).json({ message: "Aucun article à afficher !" });
      }
      res.status(200).json(data);
  });
};