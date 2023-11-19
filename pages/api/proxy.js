/* eslint-disable import/no-anonymous-default-export */
// pages/api/proxy/[...path].js
import { createProxyMiddleware } from "http-proxy-middleware";

export default function (req, res) {
  // Don't allow requests to just any URL, make sure to validate the URL being requested
  // For example, you might only allow a specific domain or set of domains
  if (req.query.url.startsWith("http://50.19.66.66:8000")) {
    const decodedUrl = decodeURIComponent(req.query.url);
    return createProxyMiddleware({
      target: decodedUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/api/proxy": "",
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
