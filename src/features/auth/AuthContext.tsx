import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useLocalStorage<User | null>("lib.auth.user", null);

    const login = useCallback<AuthContextValue["login"]>(
        async (email, password, name) => {
            // Mock auth — in production, replace with real API call
            if (!email || !password || password.length < 4) {
                throw new Error("Credenciais inválidas");
            }
            setUser({
                id: btoa(email).slice(0, 12),
                email,
                name: name?.trim() || email.split("@")[0],
            });
        },
        [setUser],
    );

    const logout = useCallback(() => setUser(null), [setUser]);

    const value = useMemo<AuthContextValue>(
        () => ({ user, isAuthenticated: !!user, login, logout }),
        [user, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
