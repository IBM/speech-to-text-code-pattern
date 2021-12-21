const webpack = require('webpack');

module.exports = {
  webpack: {
    alias: {
      "stream": "stream-browserify",
    },
    fallback: {
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/browser"),
      "stream": require.resolve("stream-browserify"),
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
      remove: [ "ModuleScopePlugin"],
    }
  }
};