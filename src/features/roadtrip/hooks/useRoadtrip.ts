import { useContext } from 'react';
import { RoadtripContext } from '../model/roadtrip.store';
import type { RoadtripContextValue } from '../model/roadtrip.types';

function useRoadtripContext(): RoadtripContextValue {
  const ctx = useContext(RoadtripContext);
  if (!ctx) throw new Error('useRoadtripContext must be used inside <RoadtripProvider>');
  return ctx;
}

export function useRoadtrip() {
  const { countryCodes, countries, isLoading, error, refreshRoadtrip } = useRoadtripContext();
  return { countryCodes, countries, isLoading, error, refreshRoadtrip };
}

export function useAddCountryToRoadtrip() {
  const { addCountry, isLoading, error } = useRoadtripContext();
  return { add: addCountry, isLoading, error };
}

export function useRemoveCountryFromRoadtrip() {
  const { removeCountry, isLoading } = useRoadtripContext();
  return { remove: removeCountry, isLoading };
}
