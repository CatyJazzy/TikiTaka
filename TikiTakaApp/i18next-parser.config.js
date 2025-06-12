module.exports = {
  contextSeparator: '_',
  createOldCatalogs: false,
  defaultNamespace: 'translation',
  defaultValue: '',
  indentation: 2,
  keepRemoved: false,
  keySeparator: '.',
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer']
  },
  lineEnding: 'auto',
  locales: ['ko', 'en'],
  output: 'app/translations/$LOCALE.json',
  input: [
    'app/**/*.{ts,tsx}',
    '!app/translations/**',
    '!**/node_modules/**'
  ],
  sort: true,
  skipDefaultValues: false,
  useKeysAsDefaultValue: true,
  verbose: true,
  failOnWarnings: false,
  customValueTemplate: null
}; 