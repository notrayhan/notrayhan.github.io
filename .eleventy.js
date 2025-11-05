module.exports = function(eleventyConfig) {
  // This line copies the file to the output directory
  eleventyConfig.addPassthroughCopy("_includes/style.css");
  eleventyConfig.addWatchTarget("_includes/style.css");
  eleventyConfig.addPassthroughCopy("img");
};
