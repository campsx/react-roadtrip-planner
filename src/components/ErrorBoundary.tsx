import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Appelé quand une erreur est capturée, avec le message d'erreur */
  onError?: (message: string) => void;
};
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error ? error.message : 'Une erreur inattendue est survenue.';
    return { hasError: true, message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
    const message = error instanceof Error ? error.message : 'Une erreur inattendue est survenue.';
    this.props.onError?.(message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="text-5xl">⚠️</span>
          <h1 className="text-xl font-semibold text-gray-800">Quelque chose s'est mal passé</h1>
          <p className="text-sm text-gray-500">{this.state.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
