import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants.js'

const distDir = 'electricity-prices'
const output = 'export'

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => ({
  assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? '' : `https://mccall.kapsi.fi/${distDir}`,
  distDir,
  output,
  images: {
    unoptimized: true,
  },
})

export default nextConfig
