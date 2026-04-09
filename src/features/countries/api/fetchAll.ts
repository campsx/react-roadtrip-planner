import type { Country, PaginatedResponse } from '../model/countries.types';
import { client } from '@/lib/client';
import { isRawPaginated, mapCountries, mapPaginated, type RawCountry, type RawPaginated } from './mappers';

export async function fetchAll(
  page?: number,
  pageSize?: number,
): Promise<Country[] | PaginatedResponse<Country>> {
  const params: Record<string, number> = {};
  if (page !== undefined) params.page = page;
  if (pageSize !== undefined) params.pageSize = pageSize;

  const { data } = await client.get<RawCountry[] | RawPaginated>('/api/countries', { params });

  if (isRawPaginated(data)) {
    return mapPaginated(data);
  }

  return mapCountries(data as RawCountry[]);
}
