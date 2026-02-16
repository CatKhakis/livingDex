const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const __base = path.resolve(__dirname, '..');
const __src = path.resolve(__base, 'src');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js'
  },
  plugins: [
     new HtmlWebpackPlugin({
      title: 'Development',
      template: "src/template.html",
     }),
     new VueLoaderPlugin()
   ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return tag.startsWith('sprite') || tag.startsWith('icon')
            }
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.sav$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};