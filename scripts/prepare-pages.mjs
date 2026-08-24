import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const client = path.resolve("build/client");
const rendered = path.join(client, "zanglmartin");
const output = path.resolve("build/pages");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(rendered, output, { recursive: true });

for (const entry of await readdir(client, { withFileTypes: true })) {
  if (entry.name === "zanglmartin" || entry.name === "index.html" || entry.name === ".vite") continue;
  await cp(path.join(client, entry.name), path.join(output, entry.name), { recursive: entry.isDirectory() });
}

async function prefixAssetPaths(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await prefixAssetPaths(target);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(target, "utf8");
      await writeFile(
        target,
        html.replaceAll('"/assets/', '"/assets/'),
      );
    } else if (entry.name.startsWith("manifest-") && entry.name.endsWith(".js")) {
      const manifest = await readFile(target, "utf8");
      await writeFile(target, manifest.replaceAll('"/assets/', '"/assets/'));
    }
  }
}

await prefixAssetPaths(output);

console.log("Prepared GitHub Pages artifact at build/pages");
