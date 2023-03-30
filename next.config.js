/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ["authjs.dev"]
  }
}

module.exports = nextConfig
