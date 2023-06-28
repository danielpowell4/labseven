module.exports = {
  images: {
    domains: ["stores.labseven.co"],
  },
  async redirects() {
    return [
      {
        source: "/locations/:name*",
        destination: "/",
        permanent: false,
      },
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
