import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "vercel.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const expectedAppRoutes = [
  "/solutions",
  "/industries",
  "/how-it-works",
  "/industries/kitchens-interior",
  "/privacy",
  "/terms",
];
const expectedLegacy = new Map([
  ["/voice-ai-agents", "/"],
  ["/about", "/#about"],
  ["/contact", "/#assessment"],
]);
const forbiddenLegacy = new Set(["/industries", "/how-it-works"]);
const staticPrefixes = ["/assets/", "/resources/"];
const staticFiles = ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest"];

const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};
const assert = (condition, message) => condition || fail(message);

assert(fs.existsSync(path.join(root, "package.json")), "package.json is not at repository root");
assert(fs.existsSync(path.join(root, "pnpm-lock.yaml")), "pnpm-lock.yaml is not at repository root");
assert(fs.existsSync(configPath), "vercel.json is not at repository root");
assert(config.buildCommand === "pnpm build", "buildCommand must be pnpm build");
assert(config.outputDirectory === "dist/public", "outputDirectory must be dist/public");

const rewrites = new Map((config.rewrites ?? []).map((item) => [item.source, item.destination]));
for (const route of expectedAppRoutes) {
  assert(rewrites.get(route) === "/index.html", `${route} must rewrite to /index.html`);
}
for (const route of forbiddenLegacy) {
  const redirect = (config.redirects ?? []).find((item) => item.source === route);
  assert(!redirect, `${route} must not be a legacy redirect`);
}
for (const [source, destination] of expectedLegacy) {
  const redirect = (config.redirects ?? []).find((item) => item.source === source);
  assert(redirect?.destination === destination && redirect.permanent === true, `${source} must permanently redirect to ${destination}`);
}
for (const route of [...staticPrefixes, ...staticFiles]) {
  assert(!rewrites.has(route), `${route} must not be intercepted by an exact SPA rewrite`);
}
const pdfHeader = (config.headers ?? []).find((item) => item.source === "/resources/(.*)\\.pdf");
const assetHeader = (config.headers ?? []).find((item) => item.source === "/assets/(.*)");
assert(assetHeader, "immutable asset cache headers are missing");
assert(pdfHeader, "direct PDF cache headers are missing");

const required = [
  "package.json",
  "pnpm-lock.yaml",
  "vercel.json",
  "client",
  "server",
  "client/public/robots.txt",
  "client/public/sitemap.xml",
  "client/public/manifest.webmanifest",
  "client/public/favicon.ico",
  "client/public/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf",
];
for (const relative of required) {
  assert(fs.existsSync(path.join(root, relative)), `missing required package path: ${relative}`);
}

if (process.exitCode) process.exit(1);
console.log(JSON.stringify({
  root,
  buildCommand: config.buildCommand,
  outputDirectory: config.outputDirectory,
  applicationRewrites: expectedAppRoutes,
  legacyRedirects: Object.fromEntries(expectedLegacy),
  staticAssetBypass: [...staticPrefixes, ...staticFiles],
  headersPreserved: true,
  result: "PASS",
}, null, 2));
