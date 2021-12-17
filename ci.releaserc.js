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
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [ '@semantic-release/npm', {
      npmPublish: false
    } ],
    '@semantic-release/git',
    '@semantic-release/github'
  ],
  release: {
    prepare: [
      '@semantic-release/changelog',
      [ '@semantic-release/npm', {
        npmPublish: false
      } ],
      {
        path: '@semantic-release/git',
        assets: [
          'package.json',
          'yarn-lock.json',
          'CHANGELOG.md'
        ],
        message: 'chore(release): Version ${nextRelease.version}\n\n${nextRelease.notes}'
      }
    ]
  }
};
