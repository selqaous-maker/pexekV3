import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] ?? "qa/lighthouse-final";
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort();

for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const audits = report.audits;
  const lcp = audits["largest-contentful-paint"];
  const lcpBreakdown = audits["lcp-breakdown-insight"] ?? audits["lcp-breakdown"];
  const details = lcpBreakdown?.details?.items?.[0] ?? {};
  const renderBlocking = audits["render-blocking-insight"]?.details?.items ?? audits["render-blocking-resources"]?.details?.items ?? [];
  const unusedJs = audits["unused-javascript"]?.details?.items ?? [];
  const unusedCss = audits["unused-css-rules"]?.details?.items ?? [];
  const mainThread = audits["mainthread-work-breakdown"]?.details?.items ?? [];
  const fonts = Object.values(audits).filter((audit) => /font|text remains visible|font-display/i.test(`${audit.id} ${audit.title}`));
  const animation = Object.values(audits).filter((audit) => /opacity|animation|transition|content visibility/i.test(`${audit.id} ${audit.title}`));
  console.log(`\n=== ${file} ===`);
  console.log("LCP", JSON.stringify({ display: lcp?.displayValue, score: lcp?.score, element: lcp?.details?.items?.[0]?.element, selector: lcp?.details?.items?.[0]?.selector }));
  console.log("LCP breakdown", JSON.stringify({ display: lcpBreakdown?.displayValue, ...details }));
  console.log("render-blocking", JSON.stringify(renderBlocking.slice(0, 10)));
  console.log("unused-js", JSON.stringify(unusedJs.slice(0, 10)));
  console.log("unused-css", JSON.stringify(unusedCss.slice(0, 10)));
  console.log("main-thread", JSON.stringify(mainThread.slice(0, 10)));
  console.log("fonts", JSON.stringify(fonts.map(({ id, title, score, displayValue }) => ({ id, title, score, displayValue }))));
  console.log("animation", JSON.stringify(animation.map(({ id, title, score, displayValue }) => ({ id, title, score, displayValue }))));
}
