// A tiny static file server — no external packages needed.
// It just serves whatever is inside the /app folder.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const APP_DIR = path.join(__dirname, "app");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

const server = http.createServer((req, res) => {
  // Simple API endpoint — added so we can also practice basic API testing,
  // not just UI testing. It does not touch any file or database.
  if (req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "success", message: "API is working" }));
    return;
  }

  let requestedPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(APP_DIR, requestedPath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`App running at http://127.0.0.1:${PORT}`);
});
