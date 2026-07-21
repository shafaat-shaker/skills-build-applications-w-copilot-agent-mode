export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (currentOrigin.includes('app.github.dev')) {
    const host = currentOrigin.replace(/:\d+$/, '');
    return `${host.replace('5174', '8000')}`;
  }

  if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
    return 'http://localhost:8000';
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const normalizedResource = resource.startsWith('/') ? resource : `/${resource}`;
  const withTrailingSlash = normalizedResource.endsWith('/') ? normalizedResource : `${normalizedResource}/`;
  return `${getApiBaseUrl()}/api${withTrailingSlash}`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const possibleCollections = ['results', 'data', 'items', 'docs', 'records', 'entries', 'users', 'activities', 'teams', 'leaderboard', 'workouts'];

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
