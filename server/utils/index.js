const slugify = require("slugify");
const generateSlug = (title) => {
  return slugify(title, {
    lower: true, // Convert to lower case
    strict: true, // Remove special characters
  });
};

module.exports = { generateSlug };
