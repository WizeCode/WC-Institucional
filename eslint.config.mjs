import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            }],
        },
    },
    {
        files: ["components/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
        ignores: ["components/providers/posthog-provider.tsx"],
        rules: {
            "no-restricted-imports": ["error", {
                paths: [
                    {
                        name: "posthog-js",
                        message:
                            "Não importe o SDK do PostHog na UI. Passe um callback (ex: onCtaClick) e deixe a página decidir o que rastrear. Ver docs/CONVENTIONS.md §11.",
                    },
                    {
                        name: "posthog-js/react",
                        message:
                            "Não importe o SDK do PostHog na UI. Passe um callback (ex: onCtaClick) e deixe a página decidir o que rastrear. Ver docs/CONVENTIONS.md §11.",
                    },
                ],
            }],
        },
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
