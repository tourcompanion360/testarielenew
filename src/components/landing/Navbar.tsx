'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

const navLinks = [
    { href: '/courses', label: 'Corsi' },
    { href: '/generate/images', label: 'Genera AI' },
    { href: '/prompts', label: 'Prompt library' },

];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a12]/90 backdrop-blur-md border-b border-[#2a2a4a]' : ''
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Ariele</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm">Accedi</Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button size="sm">Inizia Gratis</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-[#12121e] border-b border-[#2a2a4a]"
                >
                    <div className="px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-3">
                            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="secondary" className="w-full">Accedi</Button>
                            </Link>
                            <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Inizia Gratis</Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
