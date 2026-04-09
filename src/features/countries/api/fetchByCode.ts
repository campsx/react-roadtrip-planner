import type { Country } from '../model/countries.types';
import { client } from '@/lib/client';
import { mapCountry, type RawCountry } from './mappers';

export async function fetchByCode(code: string): Promise<Country> {
  const { data } = await client.get<RawCountry>(`/api/countries/codes/${code}`);
  return mapCountry(data);
}
