/* eslint-disable import/no-anonymous-default-export */
// pages/api/proxy.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default function (req, res) {
  // Validate the URL being requested
  if (req.query.url && req.query.url.startsWith("http://50.19.66.66:8000")) {
    const decodedUrl = decodeURIComponent(req.query.url);
    return createProxyMiddleware({
      target: decodedUrl,
      changeOrigin: true,
      followRedirects: true,
      pathRewrite: {
        "^/api/proxy": "",
      },
      onProxyRes: function (proxyRes, req, res) {
        // Overwrite the content-type header
        proxyRes.headers["content-type"] = "audio/mpeg";
      },
      // Additional options here if needed
    })(req, res);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing; let the proxy handle it
  },
};
