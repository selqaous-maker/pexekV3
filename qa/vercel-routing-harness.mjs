import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.env.ROUTING_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/public");
const config = JSON.parse(fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../vercel.json"), "utf8"));
const rewrites = new Map((config.rewrites ?? []).map((item) => [item.source, item.destination]));
const redirects = new Map((config.redirects ?? []).map((item) => [item.source, item]));

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".json")) return "application/json; charset=utf-8";
  if (file.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (file.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (file.endsWith(".webmanifest")) return "application/manifest+json; charset=utf-8";
  if (file.endsWith(".pdf")) return "application/pdf";
  if (file.endsWith(".ico")) return "image/x-icon";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (file.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const candidate = decoded === "/" ? "/index.html" : decoded;
  const file = path.resolve(root, `.${candidate}`);
  if (!file.startsWith(path.resolve(root) + path.sep)) return null;
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  const redirect = redirects.get(url.pathname);
  if (redirect) {
    res.writeHead(redirect.permanent ? 308 : 307, { Location: redirect.destination });
    res.end();
    return;
  }

  let file = resolveFile(url.pathname);
  if (!file && rewrites.has(url.pathname)) file = resolveFile(rewrites.get(url.pathname));
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const headers = { "Content-Type": contentType(file) };
  const headerRule = (config.headers ?? []).find((item) => {
    if (item.source === "/assets/(.*)") return url.pathname.startsWith("/assets/");
    if (item.source === "/resources/(.*)\\.pdf") return url.pathname.startsWith("/resources/") && url.pathname.endsWith(".pdf");
    return false;
  });
  for (const item of headerRule?.headers ?? []) headers[item.key] = item.value;
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
});

const port = Number(process.env.PORT || 4174);
server.listen(port, "127.0.0.1", () => console.log(`routing harness listening on ${port}`));
