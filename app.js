// index.js (ou app.js)

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { storage } = require('./upload');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
const PORT = 3000; 


const upload = multer(storage);

// Route pour l'upload de fichier
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
  }
  res.json({ message: 'Fichier téléchargé avec succès', filename: req.file.filename });
});

// Route pour le download de fichier
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Fichier non trouvé' });
    }
  });
});

// Route pour la récupération de la liste des fichiers disponibles
app.get('/api/files', (req, res) => {
  const filesDirectory = path.join(__dirname, 'uploads');
  console.log(filesDirectory)
  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la liste des fichiers' });
    }
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
