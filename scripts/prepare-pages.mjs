import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { execSync } from "node:child_process";

const clientDir = join(process.cwd(), "dist/client");
const shellPath = join(clientDir, "_shell.html");

await copyFile(shellPath, join(clientDir, "index.html"));
await copyFile(shellPath, join(clientDir, "404.html"));
await writeFile(join(clientDir, ".nojekyll"), "");
await copyFile(join(process.cwd(), "public/CNAME"), join(clientDir, "CNAME"));

for (const file of ["index.html", "404.html", "_shell.html"]) {
  const filePath = join(clientDir, file);
  const html = await readFile(filePath, "utf8");
  await writeFile(filePath, html.replaceAll("/Growth-Forge-Interactive/", "/"));
}

// Keep old bundle paths alive while cached HTML is still served.
const legacyDir = join(clientDir, "Growth-Forge-Interactive", "assets");
await mkdir(legacyDir, { recursive: true });
await copyFile(join(clientDir, "assets", "index-Dn2ybgS3.js"), join(legacyDir, "index-a4izTrnP.js"));
await copyFile(join(clientDir, "assets", "routes-CJGVwU7h.js"), join(legacyDir, "routes-D8WRB7gF.js"));
await copyFile(join(clientDir, "assets", "styles-Dxwcaxmg.css"), join(legacyDir, "styles-Dxwcaxmg.css"));

console.log("Prepared GitHub Pages artifacts in dist/client");
