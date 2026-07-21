export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME || process.env.GITHUB_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}
