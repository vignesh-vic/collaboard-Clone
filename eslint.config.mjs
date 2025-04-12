const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override specific rules
  {
    rules: {
      "@typescript-eslint/no-wrapper-object-types": "warn", // or "off"
    },
  },
];
