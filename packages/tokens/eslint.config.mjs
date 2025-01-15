import js from "@eslint/js";

export default [
  {
    ignores: ["dist/*"],
    rules: js.configs.recommended.rules
  }
]