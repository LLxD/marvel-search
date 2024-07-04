/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.annihil.us"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/heroes/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
