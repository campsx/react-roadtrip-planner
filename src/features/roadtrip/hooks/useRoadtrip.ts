import { useContext } from 'react';
import { RoadtripContext } from '../model/roadtrip.store';

export function useRoadtrip() {
  const ctx = useContext(RoadtripContext);
  if (!ctx) throw new Error('useRoadtrip must be used inside <RoadtripProvider>');
  return ctx;
}
