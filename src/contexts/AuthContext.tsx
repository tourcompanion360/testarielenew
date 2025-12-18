'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, User } from '@/lib/supabase/client';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signInWithGoogle: () => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored user (mock)
        const storedUser = localStorage.getItem('ariele_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                return { error: error.message || 'Errore durante la registrazione' };
            }

            const newUser: User = {
                id: data.user?.id || '1',
                email: email,
                full_name: fullName,
                role: 'student',
            };

            setUser(newUser);
            localStorage.setItem('ariele_user', JSON.stringify(newUser));

            return { error: null };
        } catch (err) {
            return { error: 'Errore durante la registrazione' };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                return { error: error.message || 'Credenziali non valide' };
            }

            const loggedUser: User = {
                id: data.user?.id || '1',
                email: email,
                role: 'student',
            };

            setUser(loggedUser);
            localStorage.setItem('ariele_user', JSON.stringify(loggedUser));

            return { error: null };
        } catch (err) {
            return { error: 'Errore durante il login' };
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

            if (error) {
                return { error: error.message || 'Errore con Google login' };
            }

            return { error: null };
        } catch (err) {
            return { error: 'Errore con Google login' };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem('ariele_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
