module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stores.labseven.co",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      ...["aurora", "boulder", "colorado-springs", "fort-collins"].map(
        (locationName) => ({
          source: `/${locationName}`,
          destination: `/locations/${locationName}`,
          permanent: true,
        })
      ),
      {
        source: "/threads/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/intro",
        destination: "/",
        permanent: true,
      },
      {
        source: "/design",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/embroidery",
        destination: "/services/#Embroidery",
        permanent: true,
      },
    ];
  },
};
