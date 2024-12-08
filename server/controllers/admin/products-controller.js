const path = require('path');

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

module.exports = {
  handleImageUpload,
};
