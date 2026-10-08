const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { load } = require("./load-ts.cjs");
const root = path.resolve(__dirname, "..");
const { brandAssets } = load(path.join(root, "src/shipping/config.ts"));
const originals=JSON.parse(fs.readFileSync(path.join(root,"public/assets/brand-originals.json"),"utf8"));
let missing = false;
for (const [role, relative] of Object.entries(brandAssets)) {
  const file = path.join(root, "public", relative);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    console.error(`MISSING official ${role}: ${file}`);
    missing = true;
    continue;
  }
  const bytes = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();
  if(originals[role]?.file!==relative || crypto.createHash('sha256').update(bytes).digest('hex')!==originals[role]?.sha256){console.error(`Original ${role} was changed. Update the manifest only when the user supplies a replacement original.`);missing=true;continue;}
  if((ext==='.jpg'||ext==='.jpeg')&&(bytes[0]!==255||bytes[1]!==216)){console.error(`Invalid JPEG: ${file}`);missing=true;continue;}
  if (
    ext === ".png" &&
    !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    console.error(`Invalid PNG: ${file}`);
    missing = true;
    continue;
  }
  if (ext === ".svg" && !bytes.toString("utf8").includes("<svg")) {
    console.error(`Invalid SVG: ${file}`);
    missing = true;
    continue;
  }
  console.log(
    `${role}: ${relative} (${bytes.length} bytes, SHA256 ${crypto.createHash("sha256").update(bytes).digest("hex")})`,
  );
  if (ext === ".png")
    console.log(
      `Dimensions: ${bytes.readUInt32BE(16)} x ${bytes.readUInt32BE(20)}`,
    );
}
if (missing) {
  console.error(
    "Export blocked. Supply the original background and official logo files; no substitutions.",
  );
  process.exitCode = 1;
}
