import type { Roadtrip } from '../model/roadtrip.types';
import { client } from '@/lib/client';

export async function addCountry(cca3: string): Promise<Roadtrip> {
  const { data } = await client.post<Roadtrip>('/api/roadtrip/countries', { cca3 });
  return data;
}
