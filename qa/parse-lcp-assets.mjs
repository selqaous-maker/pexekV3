import fs from "node:fs";
const report = JSON.parse(fs.readFileSync("qa/lcp-assets-home/report.json", "utf8"));
const trace = JSON.parse(fs.readFileSync("qa/lcp-assets-home/report-0.trace.json", "utf8"));
const events = trace.traceEvents ?? [];
const candidates = events.filter((event) => /largestContentfulPaint|LargestContentfulPaint|LCP/i.test(event.name ?? ""));
const nav = events.filter((event) => ["navigationStart", "firstContentfulPaint", "largestContentfulPaint::Candidate", "largestContentfulPaint"].includes(event.name));
console.log("report audit keys", Object.keys(report.audits["largest-contentful-paint"] ?? {}));
console.log("LCP candidates", JSON.stringify(candidates.slice(-30), null, 2));
console.log("navigation/lcp", JSON.stringify(nav.slice(-40), null, 2));
console.log("network insights", JSON.stringify({
  resourceSummary: report.audits["resource-summary"]?.details?.items,
  networkRequests: report.audits["network-requests"]?.details?.items?.slice(-30),
  renderBlocking: report.audits["render-blocking-resources"]?.details?.items,
  unusedJavascript: report.audits["unused-javascript"]?.details?.items,
  mainThread: report.audits["mainthread-work-breakdown"]?.details?.items,
}, null, 2));
