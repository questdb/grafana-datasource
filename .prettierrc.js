module.exports = {
  ...require('./node_modules/@grafana/toolkit/src/config/prettier.plugin.config.json'),
  proseWrap: 'always',
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'mdx',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.yml',
      options: {
        parser: 'yaml',
      },
    },
  ],
};
