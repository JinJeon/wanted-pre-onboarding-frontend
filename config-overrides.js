const path = require("path");

const { override, addWebpackAlias } = require("customize-cra");

const alias = {};
const directories = [
  "api",
  "constants",
  "components",
  "hooks",
  "pages",
  "router",
  "store",
  "styles",
  "type",
  "utils",
];

directories.forEach((directory) => {
  const key = `@${directory}`;
  const value = path.resolve(__dirname, `src/${directory}`);
  alias[key] = value;
});

module.exports = override(addWebpackAlias(alias));
