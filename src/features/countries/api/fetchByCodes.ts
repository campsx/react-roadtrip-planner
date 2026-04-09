import type { Country } from '../model/countries.types';
import { client } from '@/lib/client';
import { mapCountries, type RawCountry } from './mappers';

export async function fetchByCodes(codes: string[]): Promise<Country[]> {
  const { data } = await client.get<RawCountry[]>('/api/countries/codes', {
    params: { codes: codes.join(',') },
  });
  return mapCountries(data);
}
