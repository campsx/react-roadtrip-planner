import type { AuthUser } from '../model/auth.types';
import { client } from '@/lib/client';

export async function login(username: string, password: string): Promise<AuthUser> {
  const { data } = await client.post<AuthUser>('/api/login', { username, password });
  return data;
}
