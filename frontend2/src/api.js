const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || res.statusText);
  }
  return res.json().catch(() => ({}));
}

export default {
  register: (payload) => request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }),
  login: (payload) => request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }),
  getProfile: () => {
    const token = localStorage.getItem('token');
    return request('/api/auth/me', {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    });
  }
};
