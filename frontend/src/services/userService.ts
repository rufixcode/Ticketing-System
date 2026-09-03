import type { AuthUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export type UserFormPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type UserResponse = {
  data: AuthUser;
  message?: string;
};

type UsersResponse = {
  data: AuthUser[];
};

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const firstError = data?.errors ? Object.values(data.errors).flat()[0] : undefined;
    throw new Error(String(firstError ?? data?.message ?? 'API request failed.'));
  }

  return data as T;
}

export async function getUsers(): Promise<AuthUser[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await parseResponse<UsersResponse>(response);
  return data.data;
}

export async function createUser(payload: UserFormPayload): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse<UserResponse>(response);
  return data.data;
}

export async function updateUser(id: number, payload: Partial<UserFormPayload>): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse<UserResponse>(response);
  return data.data;
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  await parseResponse<{ message: string }>(response);
}
