const path = require('path');

module.exports = {
  name: 'frontend',
  presets: ['react'],
  viteConfig: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.css'],
      },
    },
  },
};
