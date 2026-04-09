import type { Country } from '../model/countries.types';

export type RawCountry = Record<string, unknown>;
export type RawPaginated = { data: RawCountry[]; total: number; page: number; pageSize: number };

export function mapCountry(raw: RawCountry): Country {
  const name = raw.name as Record<string, unknown>;
  const flags = raw.flags as Record<string, string> | undefined;
  const continents = raw.continents as string[] | undefined;
  const languages = raw.languages as Record<string, string> | undefined;
  const currencies = raw.currencies as Record<string, { name: string; symbol: string }> | undefined;

  return {
    code: raw.cca3 as string,
    name: name.common as string,
    officialName: name.official as string,
    capital: (raw.capital as string[] | undefined)?.[0],
    region: raw.region as string | undefined,
    subregion: raw.subregion as string | undefined,
    continent: continents?.[0],
    population: raw.population as number | undefined,
    area: raw.area as number | undefined,
    flag: raw.flag as string,
    flagUrl: flags?.png ?? '',
    languages: Object.values(languages ?? {}),
    currencies: Object.entries(currencies ?? {}).map(([code, value]) => ({
      code,
      name: value.name,
      symbol: value.symbol,
    })),
    borders: (raw.borders as string[] | undefined) ?? [],
  };
}

export function mapCountries(rawList: RawCountry[]): Country[] {
  return rawList.map(mapCountry);
}

export function isRawPaginated(data: unknown): data is RawPaginated {
  return (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    Array.isArray((data as { data: unknown }).data)
  );
}

export function mapPaginated(data: RawPaginated): { data: Country[]; total: number; page: number; pageSize: number } {
  return {
    data: mapCountries(data.data),
    total: data.total,
    page: data.page,
    pageSize: data.pageSize,
  };
}
