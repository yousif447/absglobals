/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.absglobals.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "admin.srv1642786.hstgr.cloud",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
