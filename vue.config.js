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
  }
};
