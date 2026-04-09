export type Country = {
  code: string;
  name: string;
  officialName: string;
  capital?: string;
  region?: string;
  subregion?: string;
  continent?: string;
  population?: number;
  area?: number;
  flag: string;
  flagUrl: string;
  languages: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  borders: string[];
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
