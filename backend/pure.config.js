module.exports = {
  name: 'backend',
  plugins: {
    lint: {
      presetEslint: 'node',
      eslint: {
        entry: ['src/**/*.ts'],
      },
      stylelint: {
        disable: true,
      },
      presetCommitlint: 'recommended',
    },
  },
};
