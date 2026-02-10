module.exports = function (eleventyConfig) {
    // Copier les dossiers statiques
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("admin");

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
};
