/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is enabled by default in Next 13+ app router
  },
  images: {
    domains: ["images.contentstack.io"],
  },
}

module.exports = nextConfig
