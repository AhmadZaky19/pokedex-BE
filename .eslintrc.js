module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourcerType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-else-return": "off",
    "no-param-reassign": ["error", { props: false }],
  },
};
