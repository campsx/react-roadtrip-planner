import { Link } from 'react-router-dom';
import { useRoadtrip } from '../hooks/useRoadtrip';
import { Button } from '@/components/ui/Button.tsx';
import { Spinner } from '@/components/ui/Spinner.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage.tsx';
import { EmptyState } from '@/components/ui/EmptyState.tsx';
import { PageWrapper } from '@/components/layout/PageWrapper.tsx';

export default function RoadtripPage() {
  const { countries, isLoading, error, removeCountry } = useRoadtrip();

  return (
    <PageWrapper>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Mon Roadtrip</h1>

      {error && <ErrorMessage message={error} />}

      {isLoading && (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && countries.length === 0 && (
        <EmptyState
          title="Ton roadtrip est vide"
          description="Parcours la liste des pays et ajoute ceux que tu veux visiter."
        />
      )}

      {!isLoading && countries.length > 0 && (
        <ul className="flex flex-col gap-3">
          {countries.map((country, index) => (
            <li
              key={country.code}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <span className="w-7 text-center text-sm font-bold text-gray-400">
                {index + 1}
              </span>
              <img
                src={country.flagUrl}
                alt={`Drapeau ${country.name}`}
                className="h-10 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <Link
                  to={`/countries/${country.code}`}
                  className="font-semibold text-gray-900 hover:text-blue-600"
                >
                  {country.flag} {country.name}
                </Link>
                {country.capital && (
                  <p className="text-xs text-gray-500">{country.capital}</p>
                )}
              </div>
              <Button
                variant="danger"
                isLoading={isLoading}
                onClick={() => void removeCountry(country.code)}
                className="shrink-0"
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && countries.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          {countries.length} pays dans ton roadtrip
        </p>
      )}
    </PageWrapper>
  );
}
