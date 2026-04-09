import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useRoadtrip } from '../../features/roadtrip/hooks/useRoadtrip';

export function Header() {
  const { user, logout } = useAuth();
  const { countryCodes } = useRoadtrip();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/countries" className="text-lg font-bold text-blue-600 hover:text-blue-700">
          🗺️ Roadtrip Planner
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/countries"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Pays
          </NavLink>
          <NavLink
            to="/roadtrip"
            className={({ isActive }) =>
              `relative text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Mon Roadtrip
            {countryCodes.length > 0 && (
              <span className="ml-1.5 rounded-full bg-blue-600 px-1.5 py-0.5 text-xs font-bold text-white">
                {countryCodes.length}
              </span>
            )}
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-gray-600">
              👤 {user.username}
            </span>
          )}
          <button
            onClick={logout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
