import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"

const generatedIgnores = {
  ignores: [
    "node_modules/**",
    ".next/**",
    ".vercel/**",
    ".codex-artifacts/**",
    "out/**",
    "tmp/**",
    ".preview-out-*/**",
    "*.log",
    "*.err.log",
    "*.tsbuildinfo",
  ],
}

const config = [generatedIgnores, ...nextCoreWebVitals, ...nextTypeScript]

export default config
