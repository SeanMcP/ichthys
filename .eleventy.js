module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addWatchTarget("src/");

  eleventyConfig.addFilter("niceURL", (url) => {
    return new URL(url).hostname;
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      data: "data",
    },
  };
};
