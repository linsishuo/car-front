module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "none",
  semi: false,
  wrap_line_length: 120,
  wrap_attributes: "auto",
  proseWrap: "always",
  arrowParens: "avoid",
  bracketSpacing: true,
  jsxBracketSameLine: true,
  useTabs: false,
  eslintIntegration: true,
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
  endOfLine: "auto",
}
