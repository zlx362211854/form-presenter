var path = require("path");
module.exports={
  mode: 'development',
  entry: ['babel-polyfill', './demo/main.js'],
  output: {
    path: "/build", // 配置打包输出目录
    filename: "jsBundle.js", // 配置打包后的JS文件名
    chunkFilename: "[name].[hash:8].js", //动态import文件名
    publicPath: "/build/"
  },
  devServer: {
    host: 'localhost',
    port: 9009,
    contentBase: './demo',
    open: true,
    hot: true,
    inline: true,
    stats: "errors-warnings",
    proxy: {}
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      src: path.join(__dirname, "./src"),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/env",
                {
                  "corejs": {
                    "version": 3,
                    "proposals": true // 使用尚在“提议”阶段特性的 polyfill
                  }
                }
              ],
              "@babel/typescript"
            ],
          }
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ],
  },
  plugins: [
		
	]
};