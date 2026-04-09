import { Link } from 'react-router-dom';
import type { Country } from '../model/countries.types';
import { useAddCountryToRoadtrip, useRoadtrip } from '../../roadtrip/hooks/useRoadtrip';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  const { add, isLoading } = useAddCountryToRoadtrip();
  const { countryCodes } = useRoadtrip();
  const isInRoadtrip = countryCodes.includes(country.code);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/countries/${country.code}`} className="block overflow-hidden rounded-t-xl">
        <img
          src={country.flagUrl}
          alt={`Drapeau ${country.name}`}
          className="h-36 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/countries/${country.code}`}
            className="text-base font-semibold text-gray-900 hover:text-blue-600"
          >
            {country.flag} {country.name}
          </Link>
        </div>
        {country.capital && (
          <p className="text-sm text-gray-500">
            Capitale : <span className="text-gray-700">{country.capital}</span>
          </p>
        )}
        {country.region && <Badge label={country.region} variant="blue" />}
        <div className="mt-auto pt-2">
          <Button
            variant={isInRoadtrip ? 'secondary' : 'primary'}
            isLoading={isLoading}
            disabled={isInRoadtrip}
            onClick={() => void add(country.code)}
            className="w-full"
          >
            {isInRoadtrip ? '✓ Dans le roadtrip' : '+ Ajouter au roadtrip'}
          </Button>
        </div>
      </div>
    </div>
  );
}
