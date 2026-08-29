const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const DIST_DIR = path.join(__dirname, "dist");
const OUTPUT_ZIP = path.join(__dirname, "lambda-package.zip");

if (!fs.existsSync(DIST_DIR)) {
  console.error("Build first: npm run build");
  process.exit(1);
}

const output = fs.createWriteStream(OUTPUT_ZIP);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  const size = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`Lambda package created: ${OUTPUT_ZIP} (${size} MB)`);
});

archive.on("error", (err) => {
  console.error("Archive error:", err);
  process.exit(1);
});

archive.pipe(output);

const files = fs.readdirSync(DIST_DIR);
for (const file of files) {
  if (file.endsWith(".js") || file.endsWith(".map")) {
    archive.file(path.join(DIST_DIR, file), { name: `dist/${file}` });
  }
}

const nodeModulesDir = path.join(__dirname, "node_modules");
if (fs.existsSync(nodeModulesDir)) {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));
  const depNames = Object.keys(pkg.dependencies || {});

  for (const dep of depNames) {
    const depPath = path.join(nodeModulesDir, dep);
    if (fs.existsSync(depPath)) {
      archive.directory(depPath, `node_modules/${dep}`);
    }
  }
}

archive.finalize();
