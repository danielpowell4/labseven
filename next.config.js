module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stores.labseven.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/locations/:name*",
        destination: "/",
        permanent: false,
      },
      ...["aurora", "boulder", "colorado-springs", "fort-collins"].map(
        (locationName) => ({
          source: `/${locationName}`,
          destination: "/",
          permanent: false,
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
