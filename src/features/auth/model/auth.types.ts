export type AuthUser = {
  accessToken: string;
  username: string;
};

export type ApiError = {
  status: number;
  message: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};
