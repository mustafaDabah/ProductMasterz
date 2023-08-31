/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.airtableusercontent.com/",
          port: "",
          pathname: "/v1/15/15/1675699200000/*",
        },
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "/a/*",
        },
        { 
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
          port: "",
          pathname: "/v0/b/omar-brand.appspot.com/**",
        },
      ],
    },
  }
};

module.exports = nextConfig;
