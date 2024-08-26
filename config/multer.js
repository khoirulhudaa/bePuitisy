const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => ['jpg', 'jpeg', 'png'].includes(file.mimetype.split('/')[1]) ? file.mimetype.split('/')[1] : 'jpg', // Format yang diperbolehkan
    public_id: (req, file) => 'sample-id-' + Date.now(), // Menyimpan dengan ID unik
  },
});

const upload = multer({ storage: storage });

module.exports = upload;