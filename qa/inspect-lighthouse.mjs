import fs from "node:fs";
const file = process.argv[2];
const report = JSON.parse(fs.readFileSync(file, "utf8"));
for (const id of ["color-contrast", "label-content-name-mismatch"]) {
  const audit = report.audits[id];
  if (!audit) continue;
  console.log(`\n${id}: ${audit.title}`);
  for (const item of audit.details?.items ?? []) {
    console.log(JSON.stringify({node: item.node?.snippet, selector: item.node?.selector, explanation: item.explanation, contrastRatio: item.contrastRatio, fgColor: item.fgColor, bgColor: item.bgColor}));
  }
}
