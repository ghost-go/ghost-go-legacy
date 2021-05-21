// next.config.js
const withImages = require('next-images');
module.exports = withImages({
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/:path*`, // Proxy to Backend
      },
    ];
  },
});
