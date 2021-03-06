const path = require('path');
module.exports = {
  entry: './client/index.jsx',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

 module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
};