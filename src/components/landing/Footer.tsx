'use client';

import Link from 'next/link';
import { Sparkles, Instagram, Youtube, Twitter } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Corsi', href: '/courses' },
        { label: 'Generatore AI', href: '/generate/images' },
        { label: 'Prompt library', href: '/prompts' },

    ],
    company: [
        { label: 'Chi Siamo', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Carriere', href: '#' },
        { label: 'Contatti', href: '#' },
    ],
    legal: [
        { label: 'Privacy', href: '#' },
        { label: 'Termini', href: '#' },
        { label: 'Cookie', href: '#' },
    ],
};

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
    return (
        <footer className="bg-[#0a0a12] border-t border-[#2a2a4a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Ariele</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            La piattaforma #1 per imparare a creare contenuti straordinari con l&apos;AI.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-[#1a1a2e] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Prodotto</h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Azienda</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legale</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#2a2a4a] text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Ariele Academy. Tutti i diritti riservati.
                    </p>
                </div>
            </div>
        </footer>
    );
}
