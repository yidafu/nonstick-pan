module.exports = {
  extends: ['@pure-org/eslint-config-water/react'],
  rules: {
    'import/extensions': ['warn', { ts: 'never', tsx: 'never', png: 'never' }],
  }
}
