import { createElement, useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : ''

export function apiUrl(resource) { return `${apiOrigin}/api/${resource}/` }
export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}
export function useCollection(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    fetch(apiUrl(resource), { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      return response.json()
    }).then((payload) => setState({ data: collectionFromResponse(payload), loading: false, error: '' })).catch((error) => {
      if (error.name !== 'AbortError') setState({ data: [], loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [resource])
  return state
}
export function ResourceState({ loading, error, children }) {
  if (loading) return createElement('p', { className: 'empty-state' }, 'Loading data...')
  if (error) return createElement('p', { className: 'error-state' }, `Could not load this section: ${error}`)
  return children
}
export function displayValue(value, fallback = '—') { return value === undefined || value === null || value === '' ? fallback : value }