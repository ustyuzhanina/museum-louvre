module.exports = {
    /**
     * See packages/eslint-plugin/src/configs/README.md
     * for what this recommended config contains.
     */
    env: {
        es2020: true,
        browser: true,
        node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:eslint-comments/recommended", // eslint-plugin-eslint-comments
      // "airbnb",
      "plugin:promise/recommended", // eslint-plugin-promise
      "prettier", // eslint-config-prettier
      "plugin:prettier/recommended" // eslint-plugin-prettier
      ],
      plugins: [
        "eslint-comments",                        // eslint-plugin-eslint-comments
        "promise",                                // eslint-plugin-promise
        "prettier"                                // eslint-plugin-prettier
        ],
      parserOptions: {
        ecmaVersion: 11,
        sourceType: "module"
    },
    rules: {
        "prettier/prettier": "warn",
        "no-unused-vars": "off",
        "no-console": "off",
        "no-debugger": "off",
        "no-underscore-dangle": "off",
        "no-param-reassign": "off",
        "no-shadow": "off",
        "lines-between-class-members": "off",
        "class-methods-use-this": "off",
        "no-prototype-builtins": "off",
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off"
    }
};
