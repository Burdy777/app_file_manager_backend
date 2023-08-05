const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadService = require('../../services/upload/uploadService');


const dirname = __dirname;

// config multer
const upload = multer({storage: uploadService.getStorage(dirname)});


// upload single file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
  }
  res.json({ message: 'Fichier téléchargé avec succès', filename: req.file.filename });
});

// download 
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(dirname, 'uploads', req.params.filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Fichier non trouvé' });
    }
  });
});

// get all files
router.get('/files', (req, res) => {
  const filesDirectory = path.join(dirname, 'uploads');
  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la liste des fichiers' });
    }
    res.json(files);
  });
});

module.exports = router;
