import { apiRequest } from './apiClient';
import type { ApiUser, UsersResponse } from '@/types/user';

export async function getUsers(): Promise<ApiUser[]> {
  const response = await apiRequest<UsersResponse>('/users');
  return response.data;
}
