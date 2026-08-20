import fs from "node:fs";
const dir = process.argv[2] ?? "qa/lighthouse-final";
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const report = JSON.parse(fs.readFileSync(`${dir}/${file}`, "utf8"));
  const audits = report.audits;
  const metrics = Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "speed-index", "total-blocking-time", "cumulative-layout-shift", "interactive"].map((id) => [id, audits[id]?.displayValue]));
  const failures = Object.values(audits).filter((audit) => audit.score !== null && audit.score < 1 && ["performance"].includes(audit.group)).map((audit) => audit.title);
  console.log(`${file}\t${JSON.stringify(metrics)}\t${failures.join(" | ")}`);
}
