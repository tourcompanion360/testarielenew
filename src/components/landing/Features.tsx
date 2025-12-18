'use client';

import { motion } from 'framer-motion';
import { Image, Video, MessageSquare, BookOpen, Sparkles, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui';

const features = [
    {
        icon: Image,
        title: 'Generazione Immagini AI',
        description: 'Crea immagini straordinarie con DALL-E 3. Trasforma le tue idee in arte visiva in pochi secondi.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Video,
        title: 'Video AI (Coming Soon)',
        description: 'Genera video coinvolgenti con Runway e Pika Labs. Porta i tuoi contenuti al livello successivo.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: MessageSquare,
        title: 'Chat AI Intelligente',
        description: 'Assistente AI sempre disponibile per aiutarti con prompt, consigli e supporto personalizzato.',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        icon: BookOpen,
        title: 'Video Corsi Premium',
        description: 'Impara dai migliori tutorial step-by-step. Dalla teoria alla pratica in modo semplice.',
        gradient: 'from-orange-500 to-red-500',
    },
    {
        icon: Sparkles,
        title: 'Prompt library',
        description: 'Libreria di prompt pronti all\'uso. Copia, modifica e genera contenuti incredibili.',
        gradient: 'from-blue-500 to-indigo-500',
    },
    {
        icon: Wand2,
        title: 'Strumenti Creativi',
        description: 'Suite completa di tool per editing, enhancement e post-produzione dei tuoi contenuti AI.',
        gradient: 'from-indigo-500 to-purple-500',
    },
];

export function Features() {
    return (
        <section className="py-20 sm:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Tutto ciò che ti serve per
                        <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"> creare con l&apos;AI</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Una piattaforma completa con tutti gli strumenti, i corsi e le risorse per diventare un creator AI professionista.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full group">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
