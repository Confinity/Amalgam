import { spawnSync } from "node:child_process"
import process from "node:process"

const port = process.argv[2] ?? "3001"

const nextArgs = ["scripts/dev-up.mjs", String(port), "--clean"]
const result = spawnSync(process.execPath, nextArgs, {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: false,
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 0)
