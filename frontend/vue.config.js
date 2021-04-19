// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://localhost:8081'
  },
};
