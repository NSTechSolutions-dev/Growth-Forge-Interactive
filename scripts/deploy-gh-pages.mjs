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
  execSync(
    "gh api repos/:owner/:repo/pages --method PUT -f build_type=legacy -f 'source[branch]=gh-pages' -f 'source[path]=/'",
    { cwd: process.cwd(), stdio: "inherit" },
  );
  execSync("gh api repos/:owner/:repo/pages/builds --method POST", {
    cwd: process.cwd(),
    stdio: "inherit",
  });
  console.log("Deployed to gh-pages and triggered a Pages rebuild.");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
