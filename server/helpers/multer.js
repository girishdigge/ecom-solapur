const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory
const uploadDirectory = path.join(__dirname, '../../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Save files to the upload directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    const uniqueName = `${timestamp}-${sanitizedFilename}`;
    cb(null, uniqueName);
  },
});

// Configure file filter for images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp|svg/;
  const isExtValid = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isMimeValid = allowedFileTypes.test(file.mimetype);

  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, WEBP, and SVG are allowed.')
    );
  }
};

// Export multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1 MB
});

module.exports = { upload };
