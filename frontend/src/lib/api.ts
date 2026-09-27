const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('wf_token');
}

export function setToken(token: string) {
  localStorage.setItem('wf_token', token);
}

export function clearToken() {
  localStorage.removeItem('wf_token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }

  return res.json();
}

// Auth helpers
export async function login(emailOrUsername: string, password: string) {
  const data = await api<{ user: any; token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ emailOrUsername, password }),
  });
  setToken(data.token);
  return data;
}

export async function register(
  email: string,
  username: string,
  password: string,
  displayName?: string,
) {
  const data = await api<{ user: any; token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, displayName }),
  });
  setToken(data.token);
  return data;
}

export async function getMe() {
  return api<any>('/auth/me');
}
