const path = require("path");
module.exports = {
  extends: [path.resolve(__dirname, "../../packages/config/eslint/next.js")],
  root: true,
};
