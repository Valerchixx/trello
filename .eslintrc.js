module.exports = {
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    }
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "no-shadow": "off",
    "import/extensions": "off",
    "no-unused-vars": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx"],
      },
    ],

    "import/no-unresolved": "off",
    "react/no-unused-state": "off",
    "constructor-super": "off",
    "import/prefer-default-export": "off",
    "default-param-last": "off",
    "react/self-closing-comp": "off",
    "react/no-unused-class-component-methods": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events":"off",
    "react/no-access-state-in-setstate" : "off",
    "no-unused-expressions":"off",
    "class-methods-use-this":"off",
    "react/no-did-update-set-state":"off",
    "react/jsx-boolean-value": "off",
    "no-case-declarations": "off"

  }
};
