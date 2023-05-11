module.exports = {
  plugins: {
    "postcss-nested": {},
    "postcss-mixins": {
      mixinsFiles: "../../shared/styles/variables.css",
    },
    "postcss-custom-media": {
      importFrom: "../../shared/styles/variables.css",
    },
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
  },
};
