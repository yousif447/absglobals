/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "admin.absglobals.com",
  //       pathname: "/storage/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "admin.srv1642786.hstgr.cloud",
  //       pathname: "/storage/**",
  //     },
  //   ],
  // },
  images: {
    domains: ["admin.srv1642786.hstgr.cloud", "admin.absglobals.com", "absglobals.com"],
  }
};

export default nextConfig;
