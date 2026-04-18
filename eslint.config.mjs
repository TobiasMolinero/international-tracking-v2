import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,

  {
    rules: {
      // Calidad de código
      "eqeqeq": ["error", "always"], // Requiere el uso de === y !==
      "no-duplicate-imports": "error",
      "no-unused-vars": "off",
      "no-undef": "off",

      // "no-multiple-empty-lines": ["error", { "max": 1 }],
      // "no-trailing-spaces": "error", // Elimina espacios en blanco al final de las líneas
      // "no-multi-spaces": "error", // Elimina espacios en blanco múltiples
      // "no-mixed-spaces-and-tabs": "error", // Evita mezclar espacios y tabulaciones para la indentación

      // Buenas prácticas
      "no-var": "error",
      "prefer-const": "warn",
      "prefer-template": "warn", // Prefiere el uso de template literals en lugar de concatenación de strings
      "object-shorthand": "warn",

      // Debug
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": "warn",

      // TS
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Ignora variantes no utilizadas comienzan con "_"
      "@typescript-eslint/no-explicit-any": "warn", // Evita el uso de "any" en TypeScript, pero lo permite con advertencia para casos específicos
    }
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
