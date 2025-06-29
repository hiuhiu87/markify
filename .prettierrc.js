module.exports = {
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true,
  "importOrder": ["^components/(.*)$", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "endOfLine": "auto"
}
