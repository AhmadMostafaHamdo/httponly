const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://31.97.78.230:3000",
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        // Add this to preserve cookies
        proxyReq.setHeader("Connection", "keep-alive");
      },
      cookieDomainRewrite: {
        // Preserve cookies
        "*": "",
      },
    })
  );
};
