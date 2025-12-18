'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">La piattaforma #1 per creator AI</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Crea contenuti
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            straordinari con l&apos;AI
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                    >
                        Impara a generare immagini, video e contenuti incredibili con i corsi di Ariele.
                        Accedi a prompt pronti all&apos;uso e strumenti AI all&apos;avanguardia.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Link href="/auth/register">
                            <Button size="lg" className="w-full sm:w-auto">
                                Inizia Gratis
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/courses">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                <Play className="w-5 h-5" />
                                Esplora i Corsi
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 sm:gap-16"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-3xl font-bold text-white">
                                <Zap className="w-6 h-6 text-yellow-400" />
                                10K+
                            </div>
                            <p className="text-gray-500 text-sm">Immagini Generate</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-3xl font-bold text-white">
                                <Star className="w-6 h-6 text-yellow-400" />
                                500+
                            </div>
                            <p className="text-gray-500 text-sm">Studenti Attivi</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-3xl font-bold text-white">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                                50+
                            </div>
                            <p className="text-gray-500 text-sm">Prompt library</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-gray-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
