const baseDonnees = require('../applications.js');
const sythemeFichier = require('fs');

// création d'une Article
exports.creationArticle = (req, res) => {
  console.log("Création d'un article")
  console.log("body :",req.body)
  const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
  const donnees = [
    req.body.titre,
    image,
    req.body.contenue,
    req.body.id_createur,
    req.body.date_creation
  ]
  let sql = 'INSERT INTO article (titre, image, contenue, id_createur, date_creation) VALUES(?, ?, ?, ?, ?)'
  baseDonnees.query(sql, donnees, (err, data) => {
    if (err) {
      return res.status(500).json(err.message)
    }
    res.status(201).json({ message: "Article crée !" })
  })
};

// Suppression d'une Article
exports.supressionArticle = (req, res) => {
  console.log("Suppression d'un article")
  let sqlImage = 'SELECT image FROM article WHERE id = ?'
  baseDonnees.query(sqlImage, req.params.id, (err, data) => {
    if (data) {
      const filename = data[0].image.split('/images/')[1]
      sythemeFichier.unlink(`images/${filename}`, () => {
        let sqlSuppression = 'DELETE FROM article WHERE id = ?'
        baseDonnees.query(sqlSuppression, req.params.id, (err, data) => {
          if (err) {
            return res.status(500).json(err.message)
          }
          res.status(200).json({ message: "Article supprimé !" })
          })
      })
    } 
    if (err) {
      return res.status(500).json(err.message)
    }
  })  
};

// Envoi d'une Article
exports.envoiUnArticle = (req, res) => {
  let sql = 'SELECT * FROM article WHERE id = ?'
  baseDonnees.query(sql, req.params.id, (err, data) => {
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
  baseDonnees.query(sql, (err, data) => {
      if (err) {
          return res.status(500).json(err.message);
      };
      if (data.length == 0) {
          return res.status(400).json({ message: "Aucun article à afficher !" });
      }
      res.status(200).json(data);
  });
};