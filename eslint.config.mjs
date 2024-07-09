import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const recommendedRules = {
  ...pluginJs.configs.recommended.rules,
};

const pluginReactConfigRules = {
  ...pluginReactConfig.rules,
  "react/jsx-uses-react": "off",
  "react/react-in-jsx-scope": "off",
};

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: [".next/**", "tests/**", "infra/**"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { ...pluginReactConfig.plugins },
    rules: {
      ...recommendedRules,
      ...pluginReactConfigRules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["tests/**"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.node },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
  {
    files: ["infra/**"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.node },
    },
  },
];
