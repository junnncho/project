//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require("@nrwl/next/plugins/with-nx");
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
// const getBackendUrl = ()=>{
//   switch(process.env.CIENT_ENV){
//     case 'local':
//         return 'http://localhost:8080'
//     case 'test':
//         return 'https://test.hobbies.team'
//     case 'main':
//         return 'https://backend.hobbies.team'
// }
// }

const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  swcMinify: true,
  experimental: {
    esmExternals: false,
      appDir: false,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: `https://backend.hobbies.team/:path*`,
  //     },
  //   ];
  // },
  images: {
    domains: ["127.0.0.1"],
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      // {
      //   hostname: `*.${env.endpoint}`,
      // },
    ],
  },
};

module.exports = withNx(nextConfig);
