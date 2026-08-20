import fs from "node:fs";
import { execFileSync } from "node:child_process";
const input = "client/public/assets/NeonBlueGeometricPEmblem.png";
const output = "client/public/assets/NeonBlueGeometricPEmblem.webp";
if (!fs.existsSync(input)) throw new Error(`Missing ${input}`);
execFileSync("python3", ["-c", `from PIL import Image\nim=Image.open(${JSON.stringify(input)}).convert("RGBA")\nim.save(${JSON.stringify(output)}, "WEBP", lossless=True, method=6)`], { stdio: "inherit" });
console.log(`${output}: ${fs.statSync(output).size} bytes`);
