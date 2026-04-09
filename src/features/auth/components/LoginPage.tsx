import { type FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (isAuthenticated) return <Navigate to="/countries" replace />;

  function validate(): boolean {
    let valid = true;
    if (!username.trim()) {
      setUsernameError("Le nom d'utilisateur est requis.");
      valid = false;
    } else {
      setUsernameError('');
    }
    if (!password) {
      setPasswordError('Le mot de passe est requis.');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await login(username, password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          🗺️ Roadtrip Planner
        </h1>
        <form onSubmit={(e) => void handleSubmit(e)} noValidate className="flex flex-col gap-4">
          <Input
            id="username"
            type="text"
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            autoComplete="username"
          />
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            autoComplete="current-password"
          />
          <Button type="submit" isLoading={isLoading} className="mt-2">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}
