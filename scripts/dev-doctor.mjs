import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const checks = []

function pass(name, detail) {
  checks.push({ level: "PASS", name, detail })
}

function warn(name, detail) {
  checks.push({ level: "WARN", name, detail })
}

function fail(name, detail) {
  checks.push({ level: "FAIL", name, detail })
}

function run(command, args) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/c", command, ...args], {
      cwd: root,
      encoding: "utf8",
      shell: false,
    })
  }

  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: false,
  })
}

function checkNodeVersion() {
  const version = process.versions.node
  const major = Number(version.split(".")[0] ?? 0)
  if (major === 22 || major === 24) {
    pass("Node version", `Using Node ${version}`)
    return
  }

  warn(
    "Node version",
    `Using Node ${version}. This repo supports Node 22.x or 24.x. Consider: nvm install 24.13.1 && nvm use 24.13.1`,
  )
}

function checkPnpmVersion() {
  const result = run("pnpm", ["-v"])
  if (result.status !== 0) {
    fail("pnpm availability", "pnpm command failed. Reinstall pnpm 10.x.")
    return
  }

  const version = (result.stdout ?? "").trim()
  if (!version) {
    warn("pnpm availability", "pnpm returned no version output.")
    return
  }

  const major = Number(version.split(".")[0] ?? 0)
  if (major === 10) {
    pass("pnpm version", `Using pnpm ${version}`)
    return
  }

  warn("pnpm version", `Using pnpm ${version}. Recommended major version is 10.`)
}

function checkDependencies() {
  const modulesPath = path.join(root, "node_modules")
  if (existsSync(modulesPath)) {
    pass("Dependencies", "node_modules present")
    return
  }
  fail("Dependencies", "node_modules is missing. Run pnpm install.")
}

function checkSpawnPermissions() {
  const result = run(process.execPath, ["-e", "require('node:child_process').spawnSync(process.execPath,['-v'])"])
  if (result.status === 0) {
    pass("Child process spawn", "Node child process spawn is allowed")
    return
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim()
  fail("Child process spawn", output || "Node child process spawn failed unexpectedly")
}

function checkWorkspaceWrite() {
  const tmpDir = path.join(root, "tmp")
  const testPath = path.join(tmpDir, ".doctor-write-test")
  try {
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true })
    }
    writeFileSync(testPath, "ok", "utf8")
    rmSync(testPath, { force: true })
    pass("Workspace write", "Writable project directory")
  } catch (error) {
    fail(
      "Workspace write",
      error instanceof Error ? error.message : String(error),
    )
  }
}

function checkPortState(port = 3001) {
  if (process.platform !== "win32") {
    pass("Port check", `Skipping detailed port check on ${process.platform}`)
    return
  }

  const netstat = run("cmd.exe", ["/c", "netstat -ano -p tcp"])
  if (netstat.status !== 0 || !netstat.stdout) {
    warn("Port check", "Could not inspect port state via netstat")
    return
  }

  const inUse = netstat.stdout
    .split(/\r?\n/)
    .some((line) => line.includes(`:${port}`) && line.toUpperCase().includes("LISTENING"))

  if (inUse) {
    warn("Port check", `Port ${port} is currently in use`)
  } else {
    pass("Port check", `Port ${port} is free`)
  }
}

checkNodeVersion()
checkPnpmVersion()
checkDependencies()
checkSpawnPermissions()
checkWorkspaceWrite()
checkPortState(3001)

for (const check of checks) {
  const line = `[${check.level}] ${check.name}: ${check.detail}`
  if (check.level === "FAIL") {
    console.error(line)
  } else if (check.level === "WARN") {
    console.warn(line)
  } else {
    console.log(line)
  }
}

const hasFail = checks.some((check) => check.level === "FAIL")
process.exit(hasFail ? 1 : 0)
