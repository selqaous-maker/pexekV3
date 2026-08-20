import fs from "node:fs";
for (const file of ["qa/lighthouse-final/privacy.json", "qa/lighthouse-final/terms.json"]) {
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  const audit = report.audits["color-contrast"];
  console.log(`=== ${file} ===`);
  console.log(JSON.stringify(audit?.details?.items ?? [], null, 2));
}
