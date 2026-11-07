const assert = require("node:assert/strict");
const path = require("node:path");
const { createRequire } = require("node:module");
const expoRequire = createRequire(require.resolve("expo/package.json"));
const cliRoot = path.dirname(expoRequire.resolve("@expo/cli/package.json"));
const { ExpoGoManifestHandlerMiddleware } = require(
  path.join(
    cliRoot,
    "build/src/start/server/middleware/ExpoGoManifestHandlerMiddleware.js",
  ),
);
const cases = [
  [undefined, undefined],
  ["http", "http"],
  ["https", "https"],
  ["http, http", "http"],
  ["https, http", "https"],
  [["https", "http"], "https"],
  [" HTTPS , http ", "https"],
  ["exp", "http"],
  ["javascript:alert(1)", undefined],
];
for (const [forwarded, expected] of cases) {
  const headers = {
    host: "localhost:8082",
    accept: "application/expo+json",
    "expo-platform": "ios",
  };
  if (forwarded !== undefined) headers["x-forwarded-proto"] = forwarded;
  const { protocol } =
    ExpoGoManifestHandlerMiddleware.prototype.getParsedHeaders({
      headers,
      url: "/",
    });
  assert.equal(protocol, expected, JSON.stringify(forwarded));
  assert.match(
    `${protocol || "http"}://localhost:8082/entry.bundle`,
    /^https?:\/\/.*?\//,
  );
}
console.log(
  "9 casos de protocolo do manifesto passaram, incluindo headers duplicados do túnel.",
);
