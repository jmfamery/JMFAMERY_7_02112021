const authentification = require('jsonwebtoken');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

//authentification de l'utilisateur
module.exports = (req, res, next) => {
  console.log("Authentification")
  try {
    const token = req.headers.authorization;
    const decoderToken = authentification.verify(token, codeSecurite);
    res.locals.utilisateurId = decoderToken.id;
    res.locals.moderateur = decoderToken.moderateur;
    next()
  } catch (error) {
    res.status(401).json({message: 'Requête invalide!'});
  }
};