import { useState } from 'react';
import { useCountries } from '../hooks/useCountries';
import { useSearchCountries } from '../hooks/useSearchCountries';
import { CountryCard } from './CountryCard';
import { SearchBar } from './SearchBar';
import { Pagination } from '@/components/Pagination.tsx';
import { Spinner } from '@/components/ui/Spinner.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage.tsx';
import { EmptyState } from '@/components/ui/EmptyState.tsx';
import { PageWrapper } from '@/components/layout/PageWrapper.tsx';

const PAGE_SIZE = 20;

export default function CountriesPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { countries, total, isLoading, error, refetch } = useCountries(page, PAGE_SIZE);
  const { results: searchResults, total: searchTotal, isLoading: isSearching, error: searchError } = useSearchCountries(query, page, PAGE_SIZE);

  const isSearchActive = query.trim().length > 0;
  const displayedCountries = isSearchActive ? searchResults : countries;
  const displayedTotal = isSearchActive ? searchTotal : total;
  const isDisplayLoading = isSearchActive ? isSearching : isLoading;
  const displayError = isSearchActive ? searchError : error;

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pays du monde</h1>
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      </div>

      {displayError && (
        <ErrorMessage
          message={displayError}
          onRetry={isSearchActive ? undefined : refetch}
        />
      )}

      {isDisplayLoading && (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      )}

      {!isDisplayLoading && !displayError && displayedCountries.length === 0 && (
        <EmptyState
          title="Aucun pays trouvé"
          description={isSearchActive ? `Aucun résultat pour "${query}".` : undefined}
        />
      )}

      {!isDisplayLoading && displayedCountries.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedCountries.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={displayedTotal}
            onPageChange={setPage}
          />
        </>
      )}
    </PageWrapper>
  );
}
