// next.config.js
const withImages = require('next-images');
module.exports = withImages({
  // productionBrowserSourceMaps: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/:path*`, // Proxy to Backend
  //     },
  //   ];
  // },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/problems',
        permanent: true,
      },
    ];
  },
});
