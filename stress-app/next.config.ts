import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import type { NextConfig } from 'next'
 
export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig: NextConfig = {
    output: 'export',
    assetPrefix: isDev ? undefined : '.',
    webpack: (config) => {
      config.module.rules.push({
        test: /\.md$/i,
        type: 'asset/source'
      })
      return config;
    }
  }
  return nextConfig
}