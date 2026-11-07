/** Exact-hash patches for RN 0.88 deprecations and Reanimated 4.7's native hook API. */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const manifest = require("../patches/sdk58-compat.json");
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
for (const [name, version] of Object.entries(manifest.versions)) {
  const installed = require(
    path.join(root, "node_modules", name, "package.json"),
  ).version;
  if (installed !== version)
    throw new Error(
      `Review SDK 58 compatibility patches for ${name}: expected ${version}, installed ${installed}.`,
    );
}
// Validate every file before writing any: never partially apply against unknown input.
const changes = [];
for (const patch of manifest.patches) {
  const file = path.join(root, patch.file);
  let content = fs.readFileSync(file, "utf8");
  if (hash(content) === patch.after) continue;
  if (hash(content) !== patch.before)
    throw new Error(`Compatibility patch input changed: ${patch.file}`);
  for (const edit of patch.edits)
    content =
      content.slice(0, edit.start) + edit.text + content.slice(edit.end);
  if (hash(content) !== patch.after)
    throw new Error(`Compatibility patch output mismatch: ${patch.file}`);
  changes.push({ file, content });
}
if (!process.argv.includes("--check"))
  for (const change of changes) fs.writeFileSync(change.file, change.content);
else if (changes.length)
  throw new Error(
    "SDK 58 compatibility patches are missing. Run npm run postinstall.",
  );
console.log(
  `SDK 58 compatibility: ${manifest.patches.length} files verified; ${changes.length} changes${process.argv.includes("--check") ? " pending" : " applied"}.`,
);
