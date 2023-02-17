const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@app-types': path.resolve(__dirname, 'src/types'),
      '@graphql': path.resolve(__dirname, 'src/graphql'),
    },
  },
}
