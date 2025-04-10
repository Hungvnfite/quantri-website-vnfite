const webpack = require('webpack');

module.exports = {
  // Các cài đặt khác của webpack
  plugins: [
    new webpack.ProvidePlugin({
      global: 'global',
    }),
  ],
};