const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const manifest = require("../patches/sdk58-compat.json");
const registrations = [];
const components = new Proxy(
  {},
  {
    get(_, name) {
      if (name === "ImageBackground")
        throw new Error("Deprecated ImageBackground getter was accessed");
      return String(name);
    },
  },
);
const source = fs.readFileSync(
  require.resolve("react-native-css-interop/dist/runtime/components.js"),
  "utf8",
);
vm.runInNewContext(source, {
  exports: {},
  require(name) {
    if (name === "react-native") return components;
    if (name === "./api")
      return {
        cssInterop: (component) => registrations.push(component),
        remapProps: (component) => registrations.push(component),
      };
    if (name === "react-native-safe-area-context")
      return { SafeAreaView: "SafeAreaView" };
    throw new Error(`Unexpected registration dependency: ${name}`);
  },
});
assert(registrations.includes("ScrollView"));
assert(registrations.includes("KeyboardAvoidingView"));
assert(registrations.includes("Image"));
let guards = 0;
for (const patch of manifest.patches)
  for (const edit of patch.edits) {
    if (!edit.text.startsWith('__nebulaPlatform.OS === "web"')) continue;
    for (const platform of ["ios", "android"]) {
      assert.equal(
        vm.runInNewContext(edit.text, { __nebulaPlatform: { OS: platform } }),
        undefined,
      );
    }
    guards++;
  }
assert(guards > 0);
console.log(
  `SDK 58: registration avoids ImageBackground; ${guards} dependency arguments omitted on iOS/Android.`,
);
