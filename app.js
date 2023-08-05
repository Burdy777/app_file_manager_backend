// index.js (ou app.js)
const express = require('express');
const cors = require('cors');

const app = express();

// PORT
const PORT = process.env.PORT || 3000; 


//routes
const uploadFile = require('./routes/uploadFile/upload');

// middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/file',uploadFile);

// port
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
