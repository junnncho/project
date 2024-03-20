//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    appDir: false,
  },
  images: {
    domains: [
      "tingting-debug.seon.workers.dev",
      "tingting-develop.seon.workers.dev",
      "tingting-main.seon.workers.dev",
      "127.0.0.1:8388",
      "127.0.0.1",
    ],
  },
};

module.exports = withNx(nextConfig);
