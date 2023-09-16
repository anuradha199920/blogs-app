/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.graphassets.com', 'other-host.com', 'another-host.com','images.quicknode.workers.dev'],
    },
    experimental: {
        serverActions: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig