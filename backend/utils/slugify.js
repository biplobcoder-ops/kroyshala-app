// Create URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")        // & → and
    .replace(/[^a-z0-9-]+/g, "-")  // Special char → hyphen
    .replace(/-+/g, "-")           // Multiple hyphen → single
    .replace(/^-+|-+$/g, "");      // Remove leading/trailing hyphen
};

module.exports = slugify;