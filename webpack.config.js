const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: __dirname,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: '/dist',
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-reditor.js',
    library: 'vue-reditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [new VueLoaderPlugin()]

}
