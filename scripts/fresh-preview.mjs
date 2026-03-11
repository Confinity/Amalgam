import { spawnSync, spawn } from "node:child_process"
import { existsSync, rmSync, openSync, closeSync, cpSync, mkdirSync, readdirSync } from "node:fs"
import path from "node:path"
import process from "node:process"

const port = process.argv[2] ?? "3001"
const root = process.cwd()
const logPath = path.join(root, `.preview-${port}.log`)

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
    ...options,
  })

  if (result.error) {
    console.error(result.error)
    process.exit(1)
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function runPnpm(args, options = {}) {
  if (process.platform === "win32") {
    return run("cmd.exe", ["/c", "pnpm", ...args], options)
  }

  return run("pnpm", args, options)
}

function runQuiet(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: false,
    ...options,
  })
}

function stopExistingServer(targetPort) {
  if (process.platform === "win32") {
    const netstat = runQuiet("cmd.exe", ["/c", "netstat -ano -p tcp"], {
      encoding: "utf8",
    })

    if (netstat.status !== 0 || !netstat.stdout) {
      return
    }

    const pids = new Set()
    const lines = netstat.stdout.split(/\r?\n/)

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith("TCP")) {
        continue
      }

      const columns = trimmed.split(/\s+/)
      if (columns.length < 5) {
        continue
      }

      const localAddress = columns[1] ?? ""
      const state = columns[3] ?? ""
      const pid = columns[4] ?? ""
      const match = localAddress.match(/:(\d+)$/)

      if (!match || state.toUpperCase() !== "LISTENING") {
        continue
      }

      if (match[1] === String(targetPort) && pid) {
        pids.add(pid)
      }
    }

    for (const pid of pids) {
      runQuiet("cmd.exe", ["/c", "taskkill", "/PID", String(pid), "/F", "/T"])
    }

    return
  }

  const lsof = runQuiet("lsof", ["-ti", `tcp:${targetPort}`], { encoding: "utf8" })

  if (lsof.status !== 0 || !lsof.stdout) {
    return
  }

  for (const pid of lsof.stdout.split(/\r?\n/).filter(Boolean)) {
    runQuiet("kill", ["-9", pid])
  }
}

function startPreview(targetPort, targetDir) {
  const fd = openSync(logPath, "w")
  const child =
    process.platform === "win32"
      ? spawn(
          "cmd.exe",
          [
            "/c",
            "pnpm",
            "dlx",
            "serve",
            targetDir,
            "-l",
            String(targetPort),
            "--no-clipboard",
          ],
          {
            cwd: root,
            detached: true,
            stdio: ["ignore", fd, fd],
            shell: false,
          },
        )
      : spawn(
          "pnpm",
          ["dlx", "serve", targetDir, "-l", String(targetPort), "--no-clipboard"],
          {
            cwd: root,
            detached: true,
            stdio: ["ignore", fd, fd],
            shell: false,
          },
        )

  child.unref()
  closeSync(fd)

  return child.pid
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForHealthyPreview(targetPort) {
  const baseUrl = `http://localhost:${targetPort}`
  const healthRoutes = [
    "/",
    "/services",
    "/case-studies",
    "/knowledge",
    "/launchpad",
    "/launchpad/tools",
    "/launchpad/signals",
    "/contact",
  ]
  const requiredMarkersByRoute = {
    "/": "Are product releases slowing down even though your team is busy?",
    "/launchpad": "Where are you right now?",
  }
  const deadline = Date.now() + 25000
  let lastError = "Preview did not become healthy."

  while (Date.now() < deadline) {
    try {
      const discoveredAssets = new Set()

      for (const route of healthRoutes) {
        const pageResponse = await fetch(`${baseUrl}${route}`, { cache: "no-store" })

        if (!pageResponse.ok) {
          throw new Error(`${route} returned ${pageResponse.status}`)
        }

        const html = await pageResponse.text()
        const requiredMarker = requiredMarkersByRoute[route]
        if (requiredMarker && !html.includes(requiredMarker)) {
          throw new Error(`${route} missing expected content marker`)
        }
        const assetMatches = [
          ...html.matchAll(/\/(?:[^/"'<>\\\s]+\/)?_next\/static\/[^"'\\<>\s)]+/g),
        ].map((match) => match[0].replace(/\\+$/, ""))

        for (const assetPath of assetMatches) {
          discoveredAssets.add(assetPath)
        }
      }

      for (const assetPath of discoveredAssets) {
        const assetResponse = await fetch(`${baseUrl}${assetPath}`, {
          cache: "no-store",
        })

        if (!assetResponse.ok) {
          throw new Error(`${assetPath} returned ${assetResponse.status}`)
        }
      }

      return
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
      await sleep(1000)
    }
  }

  throw new Error(lastError)
}

function stopProcessByPid(pid) {
  if (!pid) {
    return
  }

  if (process.platform === "win32") {
    runQuiet("cmd.exe", ["/c", "taskkill", "/PID", String(pid), "/F", "/T"])
    return
  }

  runQuiet("kill", ["-9", String(pid)])
}

stopExistingServer(port)

const nextDir = path.join(root, ".next")
if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true })
}

const outDir = path.join(root, "out")
if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true })
}
const previewOutDir = path.join(root, `.preview-out-${port}`)
if (existsSync(previewOutDir)) {
  rmSync(previewOutDir, { recursive: true, force: true })
}

runPnpm(["build"], {
  env: {
    ...process.env,
    LOCAL_STATIC_PREVIEW: "true",
    GITHUB_ACTIONS: "false",
  },
})

if (!existsSync(outDir)) {
  console.error("Expected build output directory `out` was not found.")
  process.exit(1)
}

cpSync(outDir, previewOutDir, { recursive: true })

// Keep local preview resilient when a browser/tab still requests legacy base-path URLs.
const legacyBasePaths = ["Amalgam", "amalgam"]
for (const legacyBasePath of legacyBasePaths) {
  const legacyDir = path.join(previewOutDir, legacyBasePath)
  mkdirSync(legacyDir, { recursive: true })
  for (const entry of readdirSync(previewOutDir)) {
    if (legacyBasePaths.includes(entry)) {
      continue
    }
    cpSync(path.join(previewOutDir, entry), path.join(legacyDir, entry), {
      recursive: true,
    })
  }
}

const previewPid = startPreview(port, previewOutDir)

try {
  await waitForHealthyPreview(port)
  console.log(`Fresh preview running on http://localhost:${port}`)
  console.log(`Log file: ${path.basename(logPath)}`)
  console.log("If a tab was already open, do one hard refresh.")
} catch (error) {
  stopProcessByPid(previewPid)
  stopExistingServer(port)
  console.error(
    `Fresh preview failed verification: ${
      error instanceof Error ? error.message : String(error)
    }`
  )
  process.exit(1)
}
