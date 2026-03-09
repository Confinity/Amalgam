/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/aboutus",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/ourwork",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/careers",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "/contact?interest=founder-review",
        permanent: false,
      },
    ]
  },
  cleanDistDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    webpackBuildWorker: false,
  },
}

export default nextConfig
