import fs from "node:fs";
const file = process.argv[2] ?? "qa/bundle-modules.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));
for (const [name, chunk] of Object.entries(data).sort((a, b) => b[1].renderedBytes - a[1].renderedBytes)) {
  console.log(`\n${name}\trendered=${chunk.renderedBytes}\tmodules=${chunk.modules.length}`);
  for (const module of chunk.modules.slice(0, 30)) console.log(`${module.renderedBytes}\t${module.id}`);
}
