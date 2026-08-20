import fs from "node:fs";
const dir = process.argv[2] ?? "qa/lighthouse-remediated";
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const report = JSON.parse(fs.readFileSync(`${dir}/${file}`, "utf8"));
  const lcp = report.audits["largest-contentful-paint"];
  const items = lcp?.details?.items ?? [];
  console.log(`\n=== ${file} ===`);
  console.log(JSON.stringify({ display: lcp?.displayValue, score: lcp?.score, items }, null, 2));
  const lcpTrace = report.trace?.traceEvents?.filter((event) => event.name === "largestContentfulPaint::Candidate" || event.name === "largestContentfulPaint" || /LCP/i.test(event.name)).slice(-20) ?? [];
  console.log("trace-lcp", JSON.stringify(lcpTrace, null, 2));
}
