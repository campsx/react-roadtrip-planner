import { client } from '@/lib/client';

export async function removeCountry(cca3: string): Promise<void> {
  await client.delete(`/api/roadtrip/countries/${cca3}`);
}
