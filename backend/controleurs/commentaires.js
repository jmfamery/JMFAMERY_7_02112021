const baseDonnees = require('../applications.js');
const sythemeFichier = require('fs');

// création d'un commentaire
exports.creationCommentaire = (req, res) => {
    const donnees = [
      req.body.id_article,
      req.body.id_createur,
      req.body.date_creation,
      req.body.contenue
    ]
    let sql = 'INSERT INTO commentaire (id_article, id_createur, date_creation, contenue) VALUES(?, ?, ?, ?)'
    baseDonnees.query(sql, donnees, (err, data) => {
      if (err) {
          res.status(500).json({ err })
      } else {
          res.status(201).json({ message: "Commentaire crée !" })
      }
    })
  };
  
  // Suppression d'un commentaire
  exports.supressionCommentaire = (req, res) => {
    console.log("Suppression d'un commentaire")
    console.log(req.params.id)
    let sql = 'DELETE FROM commentaire WHERE id_article = ?'
    baseDonnees.query(sql, req.params.id, (err, data) => {
      if (err) {
        return res.status(500).json(err.message)
      }
      res.status(200).json({ message: "Commentaire supprimé !" })
    })
    if (err) {
      return res.status(500).json(err.message)
    }
  };
  
  // Envoi d'un commentaire
  exports.envoiCommentaireUnArticle = (req, res) => {
    let sql = 'SELECT * FROM commentaire WHERE id_article = ?'
    baseDonnees.query(sql, req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json(err.message);
        };
        if (data.length == 0) {
            return res.status(400).json({ message: "Aucun commentaire à afficher !" });
        }
        res.status(200).json(data);
    });
  };