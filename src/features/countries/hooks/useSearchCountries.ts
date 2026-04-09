import { useEffect, useRef, useState } from 'react';
import { countriesApi } from '../api';
import { useNotification } from '../../notification/hooks/useNotification';
import type { Country } from '../model/countries.types';

type UseSearchCountriesResult = {
  results: Country[];
  total: number;
  isLoading: boolean;
  error: string | null;
};

const DEBOUNCE_MS = 300;

export function useSearchCountries(
  query: string,
  page: number,
  pageSize: number,
): UseSearchCountriesResult {
  const [results, setResults] = useState<Country[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      setError(null);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      async function search() {
        setIsLoading(true);
        setError(null);
        try {
          const response = await countriesApi.search(query, page, pageSize);
          setResults(response.data);
          setTotal(response.total);
        } catch (err: unknown) {
          const message =
            (err as { message?: string }).message ?? 'Erreur lors de la recherche.';
          setError(message);
          setResults([]);
          setTotal(0);
          addNotification({ type: 'error', message });
        } finally {
          setIsLoading(false);
        }
      }
      void search();
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, page, pageSize, addNotification]);

  return { results, total, isLoading, error };
}
