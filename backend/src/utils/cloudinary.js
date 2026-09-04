const cloudinary = require("../config/cloudinary");

// Upload image from buffer
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    if (!buffer) {
      reject(new Error("No buffer found"));
      return;
    }

    const uploadOptions = {
      folder: "user" || "kroyshala",
      resource_type: "auto",
      // ❌ public_id দিবে না - Cloudinary নিজে auto generate করবে
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// Delete from Cloudinary
const deleteFromCloudinary = (public_id) => {
  return new Promise((resolve, reject) => {
    if (!public_id) {
      resolve({ result: "ok" });
      return;
    }

    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };