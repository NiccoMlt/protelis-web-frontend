const path = require('path');

module.exports = {
  stories: ['../src/stories/**/*.stories.(ts|tsx|js|jsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
        }
      }
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    'storybook-addon-material-ui/register',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
};