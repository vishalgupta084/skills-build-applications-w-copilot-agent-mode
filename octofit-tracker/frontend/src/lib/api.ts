export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export const getApiUrl = (path: string) => `${API_BASE_URL}/api/${path}`;

export const normalizeListResponse = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (typeof response === 'object' && response !== null) {
    const asObj = response as Record<string, unknown>;
    if (Array.isArray(asObj.items)) {
      return asObj.items as T[];
    }
    if (Array.isArray(asObj.data)) {
      return asObj.data as T[];
    }
  }

  return [];
};
