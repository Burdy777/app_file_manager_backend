const multer = require('multer');

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Dossier de destination pour les fichiers téléchargés
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier téléchargé (utilisation d'un timestamp pour éviter les doublons)
    },
  });