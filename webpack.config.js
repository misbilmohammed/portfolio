const path = require('path')
const PugPlugin = require('pug-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, args) => {
  const isProduction = args.mode == "production";

  return {
    entry: { 
        bundle: './src/index.js',
        index: './src/views/index.pug', 
        404: './src/views/404.pug', 
        'projects/grae': './src/views/projects/grae.pug', 
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '',
        filename: 'assets/js/[name].js',
        assetModuleFilename: "assets/img/[name][ext]",
        clean: true	
    },
    plugins: [
        // enable processing of Pug files defined in webpack entry
        new PugPlugin(),
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].css'
        }),
      ],
      module: {
        rules: [
          {
            test: /\.pug$/,
            loader: PugPlugin.loader, // PugPlugin already contain the pug-loader
          },
          {
            test: /\.sass$/i, 
            use: isProduction ? [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] : ["style-loader", "css-loader", "sass-loader"],
          },
          { 
            test: /\.(png|jpg|jpeg|gif|svg)$/, 
            type: "asset/resource"
          },
        ],
      },
      devtool: "source-map",
      devServer: {
        static: {
          directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
      },
    }
}