module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        // https://github.com/semantic-release/commit-analyzer#releaserules
        releaseRules: [
          { scope: 'no-release', release: false },
          { breaking: true, release: 'major' },
          { type: 'feat', release: 'minor' },
          { type: 'refactor', scope: 'core-*', release: 'minor' },
          { type: '*', release: 'patch' },
        ],
      },
    ]
  ]
};
