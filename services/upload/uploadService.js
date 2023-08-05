const multer = require('multer');
const path = require('path');
const fs = require('fs');

function getStorage(dirnamePath) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(dirnamePath, 'uploads');
            if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + path.extname(file.originalname);
            cb(null, filename);
        },
    });
}





module.exports = {
    getStorage: getStorage,
};