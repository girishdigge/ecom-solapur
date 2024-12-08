const express = require('express');
const {
  handleImageUpload,
} = require('../../controllers/admin/products-controller.js');
const { upload } = require('../../helpers/multer.js');

const router = express.Router();

// POST route to handle image upload
router.post('/upload-image', upload.single('my_file'), handleImageUpload);

module.exports = router;
