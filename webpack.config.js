var path=require("path");
module.exports={
  mode: 'development',
  entry: ['babel-polyfill', './demo/main.js'],
  output: {
    path: "/build",
    filename: "jsBundle.js",
    chunkFilename: "[name].[hash:8].js",
    publicPath: "/build/"
  },
  devServer: {
    host: '127.0.0.1',
    port: 3001,
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
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJ
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }]
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      }
    ],
  }
};