/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hd2.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apple-clock-clone.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.hotdaddy.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "quiz-app-swart-beta.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle quests subdomain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'quests.localhost:3000',
            },
          ],
          destination: '/quests/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'quests.:domain*',
            },
          ],
          destination: '/quests/:path*',
        },
      ],
    }
  },
};

export default nextConfig;
