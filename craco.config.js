const CracoLessPlugin = require('craco-less');
console.log("执行了吗")
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'green' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};