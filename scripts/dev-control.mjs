import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import process from "node:process"

const args = process.argv.slice(2)
const action = (args[0] ?? "status").toLowerCase()
const requestedPort = args.find((arg) => /^\d+$/.test(arg))
const port = Number(requestedPort ?? "3001")
const followLogs = args.includes("--follow")

const root = process.cwd()
const outLogPath = path.join(root, `.dev-${port}.log`)
const errLogPath = path.join(root, `.dev-${port}.err.log`)

function print(message = "") {
  process.stdout.write(`${message}${os.EOL}`)
}

function printError(message = "") {
  process.stderr.write(`${message}${os.EOL}`)
}

function runQuiet(command, commandArgs) {
  return spawnSync(command, commandArgs, {
    cwd: root,
    encoding: "utf8",
    shell: false,
  })
}

function getListeningPids(targetPort) {
  if (process.platform === "win32") {
    const netstat = runQuiet("cmd.exe", ["/c", "netstat -ano -p tcp"])
    if (netstat.status !== 0 || !netstat.stdout) {
      return []
    }

    const pids = new Set()
    for (const line of netstat.stdout.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed.startsWith("TCP")) continue

      const columns = trimmed.split(/\s+/)
      if (columns.length < 5) continue

      const localAddress = columns[1] ?? ""
      const state = columns[3] ?? ""
      const pid = columns[4] ?? ""
      const match = localAddress.match(/:(\d+)$/)
      if (!match) continue
      if (state.toUpperCase() !== "LISTENING") continue
      if (Number(match[1]) === Number(targetPort) && pid) {
        pids.add(pid)
      }
    }

    return [...pids]
  }

  const lsof = runQuiet("lsof", ["-ti", `tcp:${targetPort}`])
  if (lsof.status !== 0 || !lsof.stdout) {
    return []
  }

  return lsof.stdout
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function stopPids(pids) {
  if (!pids.length) return

  if (process.platform === "win32") {
    for (const pid of pids) {
      runQuiet("cmd.exe", ["/c", "taskkill", "/PID", String(pid), "/F", "/T"])
    }
    return
  }

  for (const pid of pids) {
    runQuiet("kill", ["-9", String(pid)])
  }
}

async function fetchWithTimeout(url, timeoutMs = 3000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

async function isHealthy(targetPort) {
  try {
    const response = await fetchWithTimeout(`http://127.0.0.1:${targetPort}/`)
    return response.ok || response.status === 308
  } catch {
    return false
  }
}

function readTail(filePath, lines = 100) {
  if (!existsSync(filePath)) return ""
  const content = readFileSync(filePath, "utf8")
  return content.split(/\r?\n/).slice(-lines).join(os.EOL)
}

function printLogsTail() {
  const outTail = readTail(outLogPath)
  const errTail = readTail(errLogPath)

  if (!outTail && !errTail) {
    print(`No logs found yet for port ${port}. Start with: pnpm dev`)
    return
  }

  if (outTail) {
    print(`--- ${path.basename(outLogPath)} (tail) ---`)
    print(outTail)
  }
  if (errTail) {
    print(`--- ${path.basename(errLogPath)} (tail) ---`)
    print(errTail)
  }
}

function followLogFiles() {
  print(`Following logs for port ${port}. Press Ctrl+C to exit.`)
  const offsets = new Map()

  const emitDelta = (filePath, writer) => {
    if (!existsSync(filePath)) return
    const content = readFileSync(filePath, "utf8")
    const previousOffset = offsets.get(filePath) ?? Math.max(0, content.length - 5000)

    let nextOffset = previousOffset
    if (content.length < previousOffset) {
      nextOffset = 0
    }

    if (content.length > nextOffset) {
      writer.write(content.slice(nextOffset))
      offsets.set(filePath, content.length)
      return
    }

    offsets.set(filePath, content.length)
  }

  const interval = setInterval(() => {
    emitDelta(outLogPath, process.stdout)
    emitDelta(errLogPath, process.stderr)
  }, 800)

  const onExit = () => {
    clearInterval(interval)
    process.exit(0)
  }

  process.on("SIGINT", onExit)
  process.on("SIGTERM", onExit)
}

async function showStatus() {
  let pids = getListeningPids(port)
  let healthy = await isHealthy(port)

  // Give freshly started servers a brief settle window before reporting unhealthy.
  if (pids.length && !healthy) {
    await new Promise((resolve) => setTimeout(resolve, 1800))
    pids = getListeningPids(port)
    healthy = await isHealthy(port)
  }

  if (!pids.length) {
    print(`Dev server is not running on http://localhost:${port}`)
    print(`Start it with: pnpm dev`)
    return
  }

  print(`Dev server status: ${healthy ? "healthy" : "listening but unhealthy"}`)
  print(`URL: http://localhost:${port}`)
  print(`PID(s): ${pids.join(", ")}`)
  print(`Logs: ${path.basename(outLogPath)}, ${path.basename(errLogPath)}`)
}

async function stopServer() {
  const pids = getListeningPids(port)
  if (!pids.length) {
    print(`No dev server is listening on port ${port}.`)
    return
  }

  stopPids(pids)
  print(`Stopped dev server on port ${port} (PID(s): ${pids.join(", ")}).`)
}

async function main() {
  switch (action) {
    case "status":
      await showStatus()
      return
    case "stop":
    case "down":
      await stopServer()
      return
    case "logs":
      printLogsTail()
      if (followLogs) {
        followLogFiles()
      }
      return
    default:
      printError(`Unknown command: ${action}`)
      printError("Usage: node scripts/dev-control.mjs <status|stop|logs> [3001] [--follow]")
      process.exit(1)
  }
}

await main()
