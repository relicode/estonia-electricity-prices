import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants.js'

const APP_NAME = 'electricity-prices'

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => ({
  assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? '' : `https://mccall.kapsi.fi/${APP_NAME}`,
  distDir: APP_NAME,
  output: 'export',
  images: {
    unoptimized: true,
  },
})

export default nextConfig
