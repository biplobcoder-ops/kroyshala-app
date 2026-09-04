const multer = require("multer");
const createError = require("http-errors");

// ==========================================
// Multer Memory Storage (Buffer)
// ==========================================
const storage = multer.memoryStorage();

// File filter - only JPEG, JPG, PNG, WebP allowed
const fileFilter = (req, file, cb) => {
  // ✅ Allowed file types
  const allowedTypes = [
    "image/jpeg",  // .jpg, .jpeg
    "image/png",   // .png
    "image/webp",  // .webp
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File accepted
  } else {
    cb(
      createError(
        400,
        "Only JPEG, JPG, PNG, and WebP images are allowed"
      ),
      false // File rejected
    );
  }
};

// Upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = upload;