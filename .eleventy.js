module.exports = function(eleventyConfig) {
  // Consolidate all passthrough copies into a single object
  eleventyConfig.addPassthroughCopy({
    "_includes/style.css": "./style.css",
    "img": "./img",
    "fonts": "./fonts",
    "js": "./js"
  });

  eleventyConfig.addWatchTarget("_includes/style.css");
};
