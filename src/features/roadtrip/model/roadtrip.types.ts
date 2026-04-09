import type { Country } from '../../countries/model/countries.types';

export type Roadtrip = {
  countries: string[];
};

export type RoadtripContextValue = {
  countryCodes: string[];
  countries: Country[];
  isLoading: boolean;
  error: string | null;
  addCountry: (cca3: string) => Promise<void>;
  removeCountry: (cca3: string) => Promise<void>;
  refreshRoadtrip: () => Promise<void>;
};
