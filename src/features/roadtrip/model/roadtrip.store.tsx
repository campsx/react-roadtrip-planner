import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { roadtripApi } from '../api';
import { countriesApi } from '../../countries/api';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNotification } from '../../notification/hooks/useNotification';
import type { RoadtripContextValue } from './roadtrip.types';
import type { Country } from '../../countries/model/countries.types';

export const RoadtripContext = createContext<RoadtripContextValue | null>(null);

export function RoadtripProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCountryDetails = useCallback(async (codes: string[]) => {
    if (codes.length === 0) {
      setCountries([]);
      return;
    }
    const details = await countriesApi.fetchByCodes(codes);
    setCountries(details);
  }, []);

  const refreshRoadtrip = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const roadtrip = await roadtripApi.get();
      setCountryCodes(roadtrip.countries);
      await loadCountryDetails(roadtrip.countries);
    } catch (err: unknown) {
      const message =
        (err as { message?: string }).message ?? 'Erreur lors du chargement du roadtrip.';
      setError(message);
      addNotification({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  }, [loadCountryDetails, addNotification]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshRoadtrip();
    }
  }, [isAuthenticated, refreshRoadtrip]);

  const addCountry = useCallback(async (cca3: string) => {
    const prev = countryCodes;
    setCountryCodes((codes) => (codes.includes(cca3) ? codes : [...codes, cca3]));
    try {
      await roadtripApi.addCountry(cca3);
      await loadCountryDetails([...prev, cca3].filter((c, i, a) => a.indexOf(c) === i));
    } catch (err: unknown) {
      const message =
        (err as { message?: string }).message ?? "Erreur lors de l'ajout du pays.";
      setCountryCodes(prev);
      setError(message);
      addNotification({ type: 'error', message });
    }
  }, [countryCodes, loadCountryDetails, addNotification]);

  const removeCountry = useCallback(async (cca3: string) => {
    const prev = countryCodes;
    const nextCodes = prev.filter((c) => c !== cca3);
    setCountryCodes(nextCodes);
    setCountries((cs) => cs.filter((c) => c.code !== cca3));
    try {
      await roadtripApi.removeCountry(cca3);
    } catch (err: unknown) {
      const message =
        (err as { message?: string }).message ?? 'Erreur lors de la suppression du pays.';
      setCountryCodes(prev);
      await loadCountryDetails(prev);
      setError(message);
      addNotification({ type: 'error', message });
    }
  }, [countryCodes, loadCountryDetails, addNotification]);

  return (
    <RoadtripContext.Provider
      value={{ countryCodes, countries, isLoading, error, addCountry, removeCountry, refreshRoadtrip }}
    >
      {children}
    </RoadtripContext.Provider>
  );
}
