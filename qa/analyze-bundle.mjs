import fs from "node:fs";
import path from "node:path";
import { build, loadConfigFromFile, mergeConfig } from "vite";

process.env.NODE_ENV = "production";
const root = process.cwd();
const outFile = path.resolve(process.argv[2] ?? "qa/bundle-modules.json");
const base = await loadConfigFromFile({ command: "build", mode: "production" }, path.resolve(root, "vite.config.ts"));
const records = {};
const plugin = {
  name: "pexek-module-size-report",
  generateBundle(_options, bundle) {
    for (const [fileName, item] of Object.entries(bundle)) {
      if (item.type !== "chunk") continue;
      const modules = Object.entries(item.modules).map(([id, info]) => ({
        id: id.replace(`${root}/`, ""),
        renderedBytes: info.renderedLength,
        originalBytes: info.originalLength,
      })).sort((a, b) => b.renderedBytes - a.renderedBytes);
      records[fileName] = { renderedBytes: item.code.length, modules };
    }
  },
};
await build(mergeConfig(base.config, { build: { write: false, emptyOutDir: false }, plugins: [plugin] }));
fs.writeFileSync(outFile, JSON.stringify(records, null, 2));
console.log(`Wrote ${outFile}`);
