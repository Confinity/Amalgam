import { spawnSync, spawn } from "node:child_process"
import { existsSync, rmSync, appendFileSync, readFileSync, openSync, closeSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import process from "node:process"

const args = process.argv.slice(2)
const requestedPort = args.find((arg) => /^\d+$/.test(arg))
const port = Number(requestedPort ?? "3001")
const cleanRequested = args.includes("--clean")
const warmupEnabled = !args.includes("--no-warm")
const openRequested = args.includes("--open")
const requestedBundler = (process.env.NEXT_DEV_BUNDLER ?? "").trim().toLowerCase()

const root = process.cwd()
const outLogPath = path.join(root, `.dev-${port}.log`)
const errLogPath = path.join(root, `.dev-${port}.err.log`)
const warmRoutes = [
  "/",
  "/services/",
  "/next-move/",
  "/our-work/",
]
const canaryRoutes = ["/", "/next-move/"]

function resolveBundlerMode() {
  if (requestedBundler === "webpack") return "webpack"
  if (requestedBundler === "turbo" || requestedBundler === "turbopack") return "turbopack"
  // Turbopack has been unstable in this Windows workspace (cache corruption / hung compiles).
  // Prefer webpack locally unless explicitly overridden with NEXT_DEV_BUNDLER=turbopack.
  if (process.platform === "win32") return "webpack"
  return "default"
}

const bundlerMode = resolveBundlerMode()

function runQuiet(command, commandArgs, options = {}) {
  return spawnSync(command, commandArgs, {
    cwd: root,
    encoding: "utf8",
    shell: false,
    ...options,
  })
}

function print(message) {
  process.stderr.write(`${message}${os.EOL}`)
}

function printWarn(message) {
  process.stderr.write(`${message}${os.EOL}`)
}

function printError(message) {
  process.stderr.write(`${message}${os.EOL}`)
}

function detectNodeSupport() {
  const major = Number(process.versions.node.split(".")[0] ?? 0)
  const supported = major === 22 || major === 24
  return { major, supported }
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

function startDetachedDev(targetPort) {
  const outFd = openSync(outLogPath, "w")
  const errFd = openSync(errLogPath, "w")
  const nextCliPath = path.join(root, "node_modules", "next", "dist", "bin", "next")
  const nextArgs = [nextCliPath, "dev", "--port", String(targetPort)]

  if (bundlerMode === "webpack") {
    nextArgs.push("--webpack")
  } else if (bundlerMode === "turbopack") {
    nextArgs.push("--turbo")
  }

  const child = spawn(process.execPath, nextArgs, {
    cwd: root,
    detached: true,
    stdio: ["ignore", outFd, errFd],
    shell: false,
    env: {
      ...process.env,
      FORCE_COLOR: "1",
    },
  })

  child.unref()
  if (outFd > 2) {
    closeSync(outFd)
  }
  if (errFd > 2 && errFd !== outFd) {
    closeSync(errFd)
  }

  return child.pid
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithTimeout(url, timeoutMs = 6000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

async function removeDirWithRetries(targetPath) {
  if (!existsSync(targetPath)) return

  let lastError = null
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      rmSync(targetPath, { recursive: true, force: true })
      return
    } catch (error) {
      lastError = error
      await sleep(400)
    }
  }

  throw lastError ?? new Error(`Failed to remove ${targetPath}`)
}

async function waitForHealthy(targetPort, timeoutMs = 35000) {
  const baseUrl = `http://127.0.0.1:${targetPort}`
  const deadline = Date.now() + timeoutMs
  let lastError = "Timed out waiting for health response."

  while (Date.now() < deadline) {
    try {
      const response = await fetchWithTimeout(`${baseUrl}/`, 3500)
      if (response.ok || response.status === 308) {
        return
      }
      lastError = `Unexpected status ${response.status}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }
    await sleep(1000)
  }

  throw new Error(lastError)
}

async function waitForStableHealthy(targetPort, timeoutMs = 22000, requiredConsecutive = 6) {
  const baseUrl = `http://127.0.0.1:${targetPort}`
  const deadline = Date.now() + timeoutMs
  let consecutiveHealthy = 0
  let lastError = "Timed out waiting for stable health checks."

  while (Date.now() < deadline) {
    try {
      const response = await fetchWithTimeout(`${baseUrl}/`, 2500)
      const healthy = response.ok || response.status === 308
      if (healthy) {
        consecutiveHealthy += 1
        if (consecutiveHealthy >= requiredConsecutive) {
          return
        }
      } else {
        consecutiveHealthy = 0
        lastError = `Unexpected status ${response.status}`
      }
    } catch (error) {
      consecutiveHealthy = 0
      lastError = error instanceof Error ? error.message : String(error)
    }

    await sleep(900)
  }

  throw new Error(lastError)
}

async function warmup(targetPort) {
  const baseUrl = `http://127.0.0.1:${targetPort}`
  const startedAt = Date.now()
  const outcomes = await Promise.all(
    warmRoutes.map(async (route) => {
      try {
        const response = await fetchWithTimeout(`${baseUrl}${route}`, 12000)
        if (response.ok || response.status === 308) return null
        return `${route} (${response.status})`
      } catch (error) {
        return `${route} (${error instanceof Error ? error.message : String(error)})`
      }
    }),
  )
  const failures = outcomes.filter(Boolean)

  const duration = Date.now() - startedAt
  if (failures.length) {
    printWarn(`Warmup completed with partial misses in ${duration}ms: ${failures.join(", ")}`)
    return { duration, failures }
  }

  print(`Warm routes compiled in ${duration}ms`)
  return { duration, failures }
}

async function checkRoutes(targetPort, routes, timeoutMs = 12000) {
  const baseUrl = `http://127.0.0.1:${targetPort}`
  const outcomes = await Promise.all(
    routes.map(async (route) => {
      try {
        const response = await fetchWithTimeout(`${baseUrl}${route}`, timeoutMs)
        if (response.ok || response.status === 308) return null
        return `${route} (${response.status})`
      } catch (error) {
        return `${route} (${error instanceof Error ? error.message : String(error)})`
      }
    }),
  )

  return outcomes.filter(Boolean)
}

function readLogTail(filePath, lines = 80) {
  if (!existsSync(filePath)) return ""
  const text = readFileSync(filePath, "utf8")
  const segments = text.split(/\r?\n/)
  return segments.slice(-lines).join(os.EOL)
}

function suggestRemediation(logText) {
  const lowered = logText.toLowerCase()

  if (lowered.includes("spawn eperm") || lowered.includes("spawn eacces")) {
    return [
      "Detected process spawn permission errors.",
      "Use Node 22 LTS for this repo (`nvm install 22.13.1 && nvm use 22.13.1`).",
      "Ensure Windows Controlled Folder Access/AV is not blocking node child processes.",
      "Reinstall dependencies after changing Node (`pnpm install`).",
    ].join(os.EOL)
  }

  return [
    "Startup failed before health checks passed.",
    `Inspect ${path.basename(outLogPath)} and ${path.basename(errLogPath)} for details.`,
  ].join(os.EOL)
}

function openBrowser(targetPort) {
  const url = `http://localhost:${targetPort}/`
  if (process.platform === "win32") {
    runQuiet("cmd.exe", ["/c", "start", "", url])
    return
  }
  if (process.platform === "darwin") {
    runQuiet("open", [url])
    return
  }
  runQuiet("xdg-open", [url])
}

function printDevHints(targetPort) {
  print(`You can close this terminal. Dev server stays running in the background.`)
  print(`Status: pnpm dev:status`)
  print(`Logs:   pnpm dev:logs`)
  print(`Stop:   pnpm dev:stop`)
  print(
    `Bundler: ${
      bundlerMode === "default" ? "next default" : bundlerMode
    } (override with NEXT_DEV_BUNDLER=webpack|turbopack)`,
  )
  print(`URL:    http://localhost:${targetPort}/`)
}

async function ensureHealthyServer({ clean }) {
  const healthyBefore = await isAlreadyHealthy(port)
  if (healthyBefore && !clean) {
    print(`Dev server already running on http://localhost:${port}`)
    if (warmupEnabled) {
      const warm = await warmup(port)
      if (warm.failures.length) {
        printWarn(
          `Existing dev process failed route warmup (${warm.failures.join(", ")}). Restarting cleanly...`,
        )
      } else {
        if (openRequested) {
          openBrowser(port)
        }
        printDevHints(port)
        return
      }
    } else {
      const canaryFailures = await checkRoutes(port, canaryRoutes, 10000)
      if (canaryFailures.length) {
        printWarn(
          `Existing dev process failed route canary (${canaryFailures.join(", ")}). Restarting cleanly...`,
        )
      } else {
        if (openRequested) {
          openBrowser(port)
        }
        printDevHints(port)
        return
      }
    }
  }

  const listeningPids = getListeningPids(port)
  if (listeningPids.length) {
    print(`Port ${port} in use by pid(s): ${listeningPids.join(", ")}. Restarting cleanly...`)
    stopPids(listeningPids)
    await sleep(1000)
  }

  if (clean) {
    const nextDir = path.join(root, ".next")
    print("Removing .next cache for a clean boot...")
    await removeDirWithRetries(nextDir)
  }

  const pid = startDetachedDev(port)
  appendFileSync(outLogPath, `${os.EOL}[dev-up] spawned pid ${pid ?? "unknown"}${os.EOL}`)
  print(
    `Starting Next dev on http://localhost:${port} (${bundlerMode === "default" ? "next default bundler" : bundlerMode}) ...`,
  )

  await waitForHealthy(port)
  await waitForStableHealthy(port)
  // On Windows, Next can briefly recycle the listening process right after first-ready.
  // Give it a short settle window so callers only return once localhost is truly stable.
  await sleep(4000)
  await waitForStableHealthy(port, 14000, 2)
  print(`Dev server is healthy on http://localhost:${port}`)
  if (openRequested) {
    openBrowser(port)
  }

  if (warmupEnabled) {
    await warmup(port)
  }

  printDevHints(port)
}

async function isAlreadyHealthy(targetPort) {
  try {
    const first = await fetchWithTimeout(`http://127.0.0.1:${targetPort}/`, 2500)
    const firstHealthy = first.ok || first.status === 308
    if (!firstHealthy) {
      return false
    }

    await sleep(700)

    const second = await fetchWithTimeout(`http://127.0.0.1:${targetPort}/`, 2500)
    return second.ok || second.status === 308
  } catch {
    return false
  }
}

async function main() {
  const node = detectNodeSupport()
  if (!node.supported) {
    printWarn(
      `Node ${process.versions.node} detected. This repo supports Node 22.x or 24.x for local startup.`,
    )
  }

  try {
    await ensureHealthyServer({ clean: cleanRequested })
    return
  } catch (firstError) {
    if (cleanRequested) {
      throw firstError
    }

    printWarn(
      `Initial startup path failed (${firstError instanceof Error ? firstError.message : String(firstError)}). Retrying once with clean cache...`,
    )

    const pids = getListeningPids(port)
    if (pids.length) {
      stopPids(pids)
      await sleep(1000)
    }

    await ensureHealthyServer({ clean: true })
  }
}

try {
  await main()
} catch (error) {
  const outTail = readLogTail(outLogPath)
  const errTail = readLogTail(errLogPath)
  const combined = [outTail, errTail].filter(Boolean).join(os.EOL)

  printError(
    `Dev startup failed: ${error instanceof Error ? error.message : String(error)}`,
  )
  if (combined.trim()) {
    printError("Recent log tail:")
    printError(combined)
  }
  printError(suggestRemediation(combined))
  process.exit(1)
}
