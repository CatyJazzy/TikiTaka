module.exports = {
  input: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.spec.{js,jsx,ts,tsx}',
    '!app/i18n.ts',
    '!app/translations/**',
  ],
  output: './app/translations/$LOCALE.json',
  locales: ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  sort: true,
  createOldCatalogs: false,
  skipDefaultValues: true,
  useKeysAsDefaultValue: true,
  verbose: true,
}; 