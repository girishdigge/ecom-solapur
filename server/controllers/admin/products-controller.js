const path = require('path');
const Product = require('../../models/Product');

const handleImageUpload = (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the file's public URL
    const fileUrl = `/uploads/${req.file.filename}`;

    // Respond with the file URL
    res.status(200).json({ imageUrl: fileUrl });
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res
      .status(500)
      .json({ message: 'Failed to upload the image', error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error Occured',
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.findAll();
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error Occured',
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findOne({
      where: { id },
    });
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });

    const updatedData = {
      id,
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    };
    const updateProduts = await Product.update(updatedData);

    res.status(200).json({
      success: true,
      data: updateProduts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error Occured',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await todo.destroy({
      where: { id },
    });

    if (!product)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error Occured',
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
