/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.graphassets.com', 'other-host.com', 'another-host.com'],
    },
    experimental: {
        serverActions: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig