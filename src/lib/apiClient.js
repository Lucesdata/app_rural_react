export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

function getToken() {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

export async function api(path, opts = {}) {
  const { method = 'GET', headers = {}, body, auth = true } = opts;

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  const token = auth ? getToken() : null;
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      throw new Error(data?.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}
