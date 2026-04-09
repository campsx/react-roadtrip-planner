import { useEffect, useState } from 'react';
import { countriesApi } from '../api';
import { useNotification } from '../../notification/hooks/useNotification';
import type { Country } from '../model/countries.types';

type UseCountryResult = {
  country: Country | null;
  isLoading: boolean;
  error: string | null;
};

export function useCountry(code: string): UseCountryResult {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (!code) return;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await countriesApi.fetchByCode(code);
        setCountry(result);
      } catch (err: unknown) {
        const message = (err as { message?: string }).message ?? 'Pays introuvable.';
        setError(message);
        addNotification({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [code, addNotification]);

  return { country, isLoading, error };
}
