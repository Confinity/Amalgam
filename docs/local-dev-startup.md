# Localhost Startup (3001)

## Golden path

Use one command:

```bash
pnpm dev
```

What it does:
- Reuses existing `.next` cache for fast startup
- Returns immediately if a healthy server is already running on `http://localhost:3001`
- Restarts stale processes on port `3001`
- Runs lightweight route canaries before reusing existing servers
- Verifies health before returning
- Warms key routes so the first browser load feels instant
- Falls back once to a clean cache boot if fast path fails
- Runs detached, so you can close the terminal after startup
- Uses webpack by default on Windows for better local stability (`NEXT_DEV_BUNDLER=turbopack` to override)

## Cursor auto-start (instant on folder open)

This repo is configured to auto-start localhost `3001` when you open the folder in Cursor:

- `.vscode/tasks.json` runs `pnpm dev:auto` on folder open
- `.vscode/settings.json` sets `"task.allowAutomaticTasks": "on"`

`dev:auto` uses `--no-warm` for fastest startup and runs detached.

If you want to disable this behavior, remove or edit the folder-open task in `.vscode/tasks.json`.

Open the browser automatically after health check:

```bash
pnpm dev:up:open
```

If you want the classic attached dev server (terminal must stay open), use:

```bash
pnpm dev:watch
```

## Clean boot (only when needed)

```bash
pnpm dev:up:clean
```

This removes `.next` first. Use this after framework upgrades or when cache corruption is suspected.

## Doctor checks

```bash
pnpm dev:doctor
```

## Service controls

```bash
pnpm dev:status
pnpm dev:logs
pnpm dev:logs:follow
pnpm dev:stop
```

Checks:
- Node runtime compatibility
- pnpm version compatibility
- dependency presence
- child-process spawn capability (common source of `spawn EPERM`)
- workspace write access
- port `3001` state

## Recommended runtime

- Node `22.13.1` or `24.13.1` (supported)
- pnpm `10.x`

If you are on another Node major and see startup failures:

```bash
nvm install 24.13.1
nvm use 24.13.1
pnpm install
pnpm dev:up
```

## Review Notes Remote Sync Setup

The review-note system (`?review=true` or `/review`) supports shared remote persistence through KV and requires an admin token for page-wide clear.

Set these environment variables in your deployment:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `UPSTASH_REDIS_REST_URL` (supported alternative)
- `UPSTASH_REDIS_REST_TOKEN` (supported alternative)
- `REVIEW_NOTES_KV_PREFIX` (optional, defaults to `amalgam:review-notes:v1`)
- `REVIEW_NOTES_ADMIN_TOKEN` (required for `Clear Notes (admin)`)

Notes:
- In local development, missing KV vars falls back to single-server file mode.
- In production, review-note APIs now require shared KV storage and return `503` if not configured.
- `Clear Notes (admin)` returns `503` until `REVIEW_NOTES_ADMIN_TOKEN` is configured.
