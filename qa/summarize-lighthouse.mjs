import fs from "node:fs";
const dir = process.argv[2] ?? "qa/lighthouse-final";
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const report = JSON.parse(fs.readFileSync(`${dir}/${file}`, "utf8"));
  const scores = Object.fromEntries(Object.entries(report.categories).map(([name, category]) => [name, Math.round((category.score ?? 0) * 100)]));
  console.log(`${file}\t${JSON.stringify(scores)}`);
}
