'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export function CTA() {
    return (
        <section className="py-20 sm:py-32 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Pronto a creare contenuti
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            che fanno la differenza?
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Unisciti a centinaia di creator che stanno già usando l&apos;AI per trasformare le loro idee in realtà.
                        Inizia oggi, è gratis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/register">
                            <Button size="lg" className="w-full sm:w-auto">
                                Inizia Gratis Ora
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/courses">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                Scopri i Corsi
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
