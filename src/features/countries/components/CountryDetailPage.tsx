import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCountry } from '../hooks/useCountry';
import { useAddCountryToRoadtrip, useRoadtrip } from '../../roadtrip/hooks/useRoadtrip';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Spinner } from '../../../components/ui/Spinner';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { PageWrapper } from '../../../components/layout/PageWrapper';

export default function CountryDetailPage() {
  const { code = '' } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { country, isLoading, error } = useCountry(code);
  const { add, isLoading: isAdding } = useAddCountryToRoadtrip();
  const { countryCodes } = useRoadtrip();
  const isInRoadtrip = countryCodes.includes(code);

  return (
    <PageWrapper>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        ← Retour
      </button>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {country && (
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <img
              src={country.flagUrl}
              alt={`Drapeau ${country.name}`}
              className="w-full rounded-xl border border-gray-200 shadow-sm"
            />
            <Button
              variant={isInRoadtrip ? 'secondary' : 'primary'}
              isLoading={isAdding}
              disabled={isInRoadtrip}
              onClick={() => void add(country.code)}
              className="w-full"
            >
              {isInRoadtrip ? '✓ Dans le roadtrip' : '+ Ajouter au roadtrip'}
            </Button>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {country.flag} {country.name}
              </h1>
              <p className="mt-1 text-gray-500">{country.officialName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {country.capital && <InfoItem label="Capitale" value={country.capital} />}
              {country.region && <InfoItem label="Région" value={country.region} />}
              {country.subregion && <InfoItem label="Sous-région" value={country.subregion} />}
              {country.continent && <InfoItem label="Continent" value={country.continent} />}
              {country.population !== undefined && (
                <InfoItem label="Population" value={country.population.toLocaleString('fr-FR')} />
              )}
              {country.area !== undefined && (
                <InfoItem label="Superficie" value={`${country.area.toLocaleString('fr-FR')} km²`} />
              )}
            </div>

            {country.languages.length > 0 && (
              <Section title="Langues">
                <div className="flex flex-wrap gap-2">
                  {country.languages.map((lang) => (
                    <Badge key={lang} label={lang} variant="green" />
                  ))}
                </div>
              </Section>
            )}

            {country.currencies.length > 0 && (
              <Section title="Monnaies">
                <div className="flex flex-wrap gap-2">
                  {country.currencies.map((c) => (
                    <Badge key={c.code} label={`${c.name} (${c.symbol})`} />
                  ))}
                </div>
              </Section>
            )}

            {country.borders.length > 0 && (
              <Section title="Pays voisins">
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((borderCode) => (
                    <Link
                      key={borderCode}
                      to={`/countries/${borderCode}`}
                      className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      {borderCode}
                    </Link>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
      {children}
    </div>
  );
}
