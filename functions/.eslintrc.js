module.exports = {
  env: {
    node: true, // Enables Node.js global variables
    es2022: true, // Matches Node.js 20's ES support
  },
  parserOptions: {
    ecmaVersion: 2022, // Explicitly set to 2022 (Node.js 20's default)
    sourceType: 'script', // Required for CommonJS
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "max-len": ["error", { 
      "code": 120,
      "ignoreComments": true,
      "ignoreUrls": true
    }],
    "require-jsdoc": "off", // Disable Google's JSDoc requirement
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      env: {
        node: true // Special override for config file
      }
    },
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
        node: true
      }
    }
  ]
};