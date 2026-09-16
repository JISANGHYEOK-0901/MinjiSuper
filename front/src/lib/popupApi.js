export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'http://localhost:8080' : 'https://be-production-32e8.up.railway.app');

export async function popupRequest(path, options = {}, admin = true) {
  const response = await fetch(`${API_BASE_URL}/api/${path}`, {
    ...options,
    headers: { ...(admin ? { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } : {}), ...options.headers },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const error = new Error(data.message || '요청에 실패했습니다. 다시 시도해 주세요.');
    error.status = response.status;
    throw error;
  }
  return response;
}
