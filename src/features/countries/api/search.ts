import type { PaginatedResponse } from '../model/countries.types';
import type { Country } from '../model/countries.types';
import { client } from '@/lib/client';
import { mapPaginated, type RawPaginated } from './mappers';

export async function search(
  name: string,
  page?: number,
  pageSize?: number,
): Promise<PaginatedResponse<Country>> {
  const params: Record<string, number> = {};
  if (page !== undefined) params.page = page;
  if (pageSize !== undefined) params.pageSize = pageSize;

  const { data } = await client.get<RawPaginated>(
    `/api/countries/name/${encodeURIComponent(name)}`,
    { params },
  );

  return mapPaginated(data);
}
