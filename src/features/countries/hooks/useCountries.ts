import { useCallback, useEffect, useRef, useState } from 'react';
import { countriesApi } from '../api';
import { useNotification } from '../../notification/hooks/useNotification';
import type { Country, PaginatedResponse } from '../model/countries.types';

type UseCountriesResult = {
  countries: Country[];
  total: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useCountries(page = 1, pageSize = 20): UseCountriesResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const { addNotification } = useNotification();
  const abortRef = useRef<AbortController | null>(null);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await countriesApi.fetchAll(page, pageSize);
        if (Array.isArray(result)) {
          setCountries(result);
          setTotal(result.length);
        } else {
          const paged = result as PaginatedResponse<Country>;
          setCountries(paged.data);
          setTotal(paged.total);
        }
      } catch (err: unknown) {
        const message =
          (err as { message?: string }).message ?? 'Erreur lors du chargement des pays.';
        setError(message);
        addNotification({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    }

    void load();
    return () => abortRef.current?.abort();
  }, [page, pageSize, tick, addNotification]);

  return { countries, total, isLoading, error, refetch };
}
