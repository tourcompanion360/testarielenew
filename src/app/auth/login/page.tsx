'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate login (replace with actual auth)
        setTimeout(() => {
            localStorage.setItem('ariele_user', JSON.stringify({
                id: '1',
                email: email,
                role: 'student',
            }));
            router.push('/dashboard/student');
        }, 1000);
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // Implement Google OAuth
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Torna alla home</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Ariele</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Bentornato!</h1>
                    <p className="text-gray-400">Accedi al tuo account per continuare</p>
                </div>

                {/* Form */}
                <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            type="email"
                            label="Email"
                            placeholder="la-tua@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock className="w-5 h-5" />}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[42px] text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-400">
                                <input type="checkbox" className="rounded border-gray-600" />
                                Ricordami
                            </label>
                            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
                                Password dimenticata?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Accedi
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#2a2a4a]" />
                        <span className="text-gray-500 text-sm">oppure</span>
                        <div className="flex-1 h-px bg-[#2a2a4a]" />
                    </div>

                    {/* Social Login */}
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continua con Google
                    </Button>

                    {/* Register Link */}
                    <p className="text-center text-gray-400 mt-6">
                        Non hai un account?{' '}
                        <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Registrati gratis
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
