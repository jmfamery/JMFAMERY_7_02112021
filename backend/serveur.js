const http = require('http');
const appliExpress = require('./applications');

// Connection du serveur
function portValide(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

require('dotenv').config();
const numeroPort = process.env.DB_port;

const port = portValide(process.env.PORT || numeroPort);
appliExpress.set('port', port);

const portErreur = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const addresse = serveur.address();
  const bind = typeof addresse === 'string' ? 'L\'addresse ' + addresse : 'du port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' est déjà en cours d\'utilisation.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const serveur = http.createServer(appliExpress);

serveur.on('error', portErreur);
serveur.on('listening', () => {
  const addresse = serveur.address();
  const bind = typeof addresse === 'string' ? 'L\'addresse ' + addresse : 'port ' + port;
  console.log('Connexion sur le ' + bind);
});

serveur.listen(port);