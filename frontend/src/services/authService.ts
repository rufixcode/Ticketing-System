const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type AuthResponse = {
  message: string;
  user: AuthUser;
};

async function authRequest(path: string, payload: LoginPayload | RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const firstError = data?.errors ? Object.values(data.errors).flat()[0] : undefined;
    const message = firstError ?? data?.message ?? 'Request failed.';
    throw new Error(String(message));
  }

  return data as AuthResponse;
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return authRequest('/login', payload); 
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return authRequest('/register', payload);
}
