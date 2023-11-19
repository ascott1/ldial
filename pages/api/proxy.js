/* eslint-disable import/no-anonymous-default-export */
// pages/api/proxy.js
import http from "http";

export default function handler(req, res) {
  if (req.method === "GET" && req.query.url) {
    const targetUrl = new URL(decodeURIComponent(req.query.url));

    // Check if the URL is valid and allowed
    if (targetUrl.hostname === "50.19.66.66") {
      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port,
        path: targetUrl.pathname,
        method: "GET",
        headers: {
          "Content-Type": "audio/mpeg",
        },
      };

      const proxy = http.request(options, function (proxyRes) {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxy, { end: true });

      proxy.on("error", function (e) {
        console.error("Proxy error:", e);
        res.status(500).json({ message: "Internal Server Error" });
      });
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
