import { execSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const sourceDir = join(process.cwd(), "dist/client");
const remote = execSync("git remote get-url origin", { cwd: process.cwd() }).toString().trim();
const tempDir = await mkdtemp(join(tmpdir(), "gh-pages-"));

try {
  execSync(`cp -R "${sourceDir}/." "${tempDir}/"`);
  execSync("git init -b gh-pages", { cwd: tempDir, stdio: "inherit" });
  execSync(`git remote add origin ${remote}`, { cwd: tempDir, stdio: "inherit" });
  execSync("git add -A", { cwd: tempDir, stdio: "inherit" });
  execSync('git commit -m "Deploy static site"', { cwd: tempDir, stdio: "inherit" });
  execSync("git push -f origin gh-pages", { cwd: tempDir, stdio: "inherit" });
  execSync("gh workflow run deploy.yml --ref main", { cwd: process.cwd(), stdio: "inherit" });
  console.log("Pushed gh-pages and triggered the GitHub Actions deploy workflow.");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
