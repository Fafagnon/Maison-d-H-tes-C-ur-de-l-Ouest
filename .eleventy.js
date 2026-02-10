module.exports = function (eleventyConfig) {
    // Filtre pour les dates en français
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        if (!dateObj) return "";
        const date = new Date(dateObj);
        return new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    });

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
