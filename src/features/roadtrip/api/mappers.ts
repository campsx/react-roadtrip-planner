export type RawRoadtripCountry = string | { cca3?: string; code?: string };
export type RawRoadtrip = { countries: RawRoadtripCountry[] };

export function extractCode(entry: RawRoadtripCountry): string {
  if (typeof entry === 'string') return entry;
  return (entry.cca3 ?? entry.code) as string;
}
