export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const normalizedResource = resource.startsWith('/') ? resource : `/${resource}`;
  return `${getApiBaseUrl()}/api${normalizedResource}`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const possibleCollections = ['results', 'data', 'items', 'docs', 'records', 'entries'];

  for (const key of possibleCollections) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
}

export async function fetchCollection(resource) {
  const response = await fetch(getApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}: ${response.status}`);
  }

  return response.json();
}
