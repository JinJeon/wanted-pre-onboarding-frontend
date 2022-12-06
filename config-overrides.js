const path = require("path");

const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@api": path.resolve(__dirname, "src/api"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@components": path.resolve(__dirname, "src/components"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@router": path.resolve(__dirname, "src/router"),
    "@store": path.resolve(__dirname, "src/store"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@type": path.resolve(__dirname, "src/type"),
    "@utils": path.resolve(__dirname, "src/utils"),
  }),
);
