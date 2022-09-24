module.exports = {
  name: 'frontend',
  presets: ['react'],
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.css'],
      },
    },
  },
};
