import fs from "node:fs";
const report = JSON.parse(fs.readFileSync(process.argv[2] ?? "qa/lighthouse-remediated/home.json", "utf8"));
console.log(Object.keys(report));
console.log("artifacts", report.artifacts ? Object.keys(report.artifacts) : null);
console.log("lcp audit keys", Object.keys(report.audits["largest-contentful-paint"] ?? {}));
console.log("lcp details keys", Object.keys(report.audits["largest-contentful-paint"]?.details ?? {}));
