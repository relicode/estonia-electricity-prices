const APP_NAME = 'electricity-prices'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/' + APP_NAME,
  assetPrefix: `https://mccall.kapsi.fi/${APP_NAME}`,
  distDir: APP_NAME,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
