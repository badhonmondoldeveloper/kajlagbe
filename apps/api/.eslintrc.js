const path = require("path");
module.exports = {
  extends: [path.resolve(__dirname, "../../packages/config/eslint/nest.js")],
  root: true,
  env: {
    node: true,
    jest: true,
  },
};
