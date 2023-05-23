/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ["localhost", "authjs.dev", "i.scdn.co", "cdn.discordapp.com", "cloudflare-ipfs.com", "petsit.hootsifer.com"]
  }
}

module.exports = nextConfig
