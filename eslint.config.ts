import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      "react-hooks/exhaustive-deps": "off"
    }
  })
];

export default eslintConfig;
