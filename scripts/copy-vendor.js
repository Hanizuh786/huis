// Copies the Bootstrap JS bundle from node_modules into assets/js
// so the static site has no runtime dependency on node_modules.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js", "bootstrap.bundle.min.js");
const destDir = path.join(__dirname, "..", "assets", "js");
const dest = path.join(destDir, "bootstrap.bundle.min.js");

if (!fs.existsSync(src)) {
  console.error("bootstrap not found in node_modules — run npm install first.");
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("copied " + path.relative(process.cwd(), dest));
