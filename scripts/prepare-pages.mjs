import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const client = path.resolve("build/client");
const output = path.resolve("build/pages");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(client, { withFileTypes: true })) {
  if (entry.name === ".vite" || entry.name === "__spa-fallback.html") continue;
  await cp(path.join(client, entry.name), path.join(output, entry.name), { recursive: entry.isDirectory() });
}

console.log("Prepared GitHub Pages artifact at build/pages");
