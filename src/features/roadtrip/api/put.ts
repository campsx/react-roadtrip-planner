import type { Roadtrip } from '../model/roadtrip.types';
import { client } from '@/lib/client';

export async function put(countries: string[]): Promise<Roadtrip> {
  const { data } = await client.put<Roadtrip>('/api/roadtrip', { countries });
  return data;
}
