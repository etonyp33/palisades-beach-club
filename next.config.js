/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PARSE_APP_ID: "AsesyWyk7X2bKcPjwpKcOJXxMKbPsUyGC4dDW9K6",
    PARSE_JS_KEY: "zuIspg7joqCql4JZ7QsB1u3QVjMSOsVAxUVayIYq"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tonypweb.com',
        port: '',
        pathname: '/pbc/**',
      },
    ],
  },
};

module.exports = nextConfig;
