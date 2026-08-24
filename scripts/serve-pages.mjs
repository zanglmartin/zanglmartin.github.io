import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve("build/pages");
const port = Number(process.env.PORTFOLIO_PREVIEW_PORT ?? 4173);
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function resolveFile(urlPath) {
  const relative = decodeURIComponent(urlPath).replace(/^\/+/, "");
  let target = path.resolve(root, relative);
  if (!target.startsWith(`${root}${path.sep}`) && target !== root) return null;

  try {
    const details = await stat(target);
    if (details.isDirectory()) target = path.join(target, "index.html");
    await stat(target);
    return target;
  } catch {
    return path.join(root, "index.html");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  const file = await resolveFile(url.pathname);
  if (!file) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes.get(path.extname(file)) ?? "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}/`);
});
