const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');
const fs = require('fs');

const root = __dirname;

console.log('> Webpack config executing...');
console.log('> root:', root);
console.log('> Resolved main.ts:', resolve(root, 'src/main.ts'));
console.log('> Does main.ts exist?:', fs.existsSync(resolve(root, 'src/main.ts')));
console.log('> Output dir:', join(root, 'dist'));

module.exports = {
  output: {
    path: join(root, 'dist'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'swc',
      main: resolve(root, 'src/main.ts'),
      tsConfig: resolve(root, 'tsconfig.app.json'),
      assets: [resolve(root, 'src/assets')],
      optimization: false,
      skipTypeChecking: true,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
      watch: true,
      watchDependencies: true,
    }),
  ],
};
