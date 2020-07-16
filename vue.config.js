const copywebpackplugins = require("copy-webpack-plugin");
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://118.24.25.7:5000",
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
      // mutate config for production...
    }
    config.plugins.push(
      new copywebpackplugins([
        {
          from: "./static", // 新增可以被index.html访问的静态文件目录,支持多个
          to: this.outputDir,
          ignore: [".*"]
        }
      ])
    );
  },
  chainWebpack: config => {
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // 用cdn方式引入
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'elementUI':'ELEMENT'
    })
  },
};
