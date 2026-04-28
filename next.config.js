/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not add /portfolio -> /programs (browsers cache 308 for a long time).
  // If old bookmarks hit /programs, send them to the real page:
  async redirects() {
    return [
      {
        source: "/programs",
        destination: "/portfolio",
        permanent: false,
      },
    ]
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "i.imgur.com"
    ],
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 