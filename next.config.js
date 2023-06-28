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
    ];
  },
};
