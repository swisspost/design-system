
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  "files": "src/**",
  "targets": [
    "angular",
    "react"
  ],
  "dest": "dist",
  "commonOptions": {
    "typescript": true
  },
  "options": {
    "angular": {},
    "react": {
      "stylesType": "style-tag"
    }
  }
}