const baseDonnees = require('../applications.js');
const sythemeFichier = require('fs');

// création d'un commentaire
exports.creationCommentaire = (req, res) => {
  console.log("Creation d'un commentaire")
  const donnees = [
    req.body.id_article,
    res.locals.utilisateurId,
    req.body.contenue
  ]
  let sql = 'INSERT INTO commentaire (id_article, id_createur, contenue, date_creation) VALUES(?, ?, ?, NOW())'
  baseDonnees.query(sql, donnees, (err, data) => {
    if (err) {
        res.status(500).json({ err })
    } else {
        res.status(201).json({ message: "Commentaire crée !" })
    }
  })
};

// Suppression des commentaires
exports.supressionTousCommentaires = (req, res) => {
  console.log("Suppression des commentaires")
  let sqlCreateur = 'SELECT id_createur FROM article WHERE id = ?'
  baseDonnees.query(sqlCreateur, req.params.id, (err, data) => {
    if (res.locals.utilisateurId === data[0].id_createur || res.locals.moderateur) {
      let sqlSuppression = 'DELETE FROM commentaire WHERE id_article = ?'
      baseDonnees.query(sqlSuppression, req.params.id, (err, data) => {
        if (err) {
          return res.status(500).json(err.message)
        }
        res.status(200).json({ message: "Commentaire supprimé !" })
      })
    }
  })
};

  // Suppression d'un commentaire
  exports.supressionUnCommentaire = (req, res) => {
    console.log("Suppression d'un commentaire")  
    let sqlCreateur = 'SELECT id_createur FROM commentaire WHERE id = ?'
    baseDonnees.query(sqlCreateur, req.params.id, (err, data) => {
      if (res.locals.utilisateurId === data[0].id_createur || res.locals.moderateur) {
        let sqlSuppression = 'DELETE FROM commentaire WHERE id = ?'
        baseDonnees.query(sqlSuppression, req.params.id, (err, data) => {
          if (err) {
            return res.status(500).json(err.message)
          }
          res.status(200).json({ message: "Commentaire supprimé !" })
        })
      } 
    })
  };

  // Envoi d'un commentaire
  exports.envoiCommentaireUnArticle = (req, res) => {
    let sql = 'SELECT commentaire.*, DATE_FORMAT(date_creation, "%d/%m/%Y à %H:%i") date_creation, nom, prenom FROM commentaire LEFT JOIN utilisateur ON commentaire.id_createur = utilisateur.id WHERE commentaire.id_article = ? ORDER BY commentaire.id'
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