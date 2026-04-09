import type { Roadtrip } from '../model/roadtrip.types';
import { client } from '@/lib/client';
import { extractCode, type RawRoadtrip } from './mappers';

export async function get(): Promise<Roadtrip> {
  const { data } = await client.get<RawRoadtrip>('/api/roadtrip');
  return { countries: data.countries.map(extractCode) };
}
