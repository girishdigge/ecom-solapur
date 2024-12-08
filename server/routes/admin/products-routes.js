const express = require('express');
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} = require('../../controllers/admin/products-controller.js');
const { upload } = require('../../helpers/multer.js');

const router = express.Router();

// POST route to handle image upload
router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get', fetchAllProducts);

module.exports = router;
