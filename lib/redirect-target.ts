type RedirectSearchParams = Record<string, string | string[] | undefined>

type RedirectTargetOptions = {
  omitKeys?: ReadonlyArray<string>
}

export function buildRedirectTarget(
  target: string,
  searchParams: RedirectSearchParams,
  options?: RedirectTargetOptions,
) {
  const [path, query = ""] = target.split("?")
  const mergedParams = new URLSearchParams(query)
  const omitted = new Set(options?.omitKeys ?? [])

  for (const [key, value] of Object.entries(searchParams)) {
    if (omitted.has(key) || mergedParams.has(key) || value === undefined) {
      continue
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        if (!entry) {
          continue
        }

        mergedParams.append(key, entry)
      }
      continue
    }

    if (!value) {
      continue
    }

    mergedParams.append(key, value)
  }

  const nextQuery = mergedParams.toString()
  return nextQuery ? `${path}?${nextQuery}` : path
}

export function buildRedirectTargetFromQueryString(
  target: string,
  queryString: string,
  options?: RedirectTargetOptions,
) {
  const source = new URLSearchParams(
    queryString.startsWith("?") ? queryString.slice(1) : queryString,
  )
  const searchParams: RedirectSearchParams = {}
  const keys = new Set<string>()

  for (const [key] of source.entries()) {
    keys.add(key)
  }

  for (const key of keys) {
    const values = source.getAll(key).filter(Boolean)
    if (values.length === 0) {
      continue
    }

    searchParams[key] = values.length === 1 ? values[0] : values
  }

  return buildRedirectTarget(target, searchParams, options)
}
