'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Video, Sparkles, Clock, Film, Zap, Rocket, Bell, ArrowRight
} from 'lucide-react';
import { Button, Card, Input, SidebarLayout } from '@/components/ui';

const features = [
    { icon: Film, title: 'Genera da testo', description: 'Descrivi la tua scena e l\'AI creerà un video' },
    { icon: Rocket, title: 'Image-to-Video', description: 'Anima le tue immagini statiche' },
    { icon: Sparkles, title: 'Effetti speciali', description: 'Aggiungi effetti cinematografici avanzati' },
    { icon: Clock, title: 'Fino a 10 secondi', description: 'Clip brevi e impattanti' },
];

export default function VideoGenerationPage() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Genera Video AI</h1>
                        <p className="text-gray-400">Coming Soon - Runway & Pika Labs</p>
                    </div>
                </div>
            </header>

            <div className="p-6 max-w-4xl mx-auto">
                {/* Preview Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="relative overflow-hidden mb-8">
                        {/* Coming Soon Overlay */}
                        <div className="absolute inset-0 bg-[#1a1a2e]/90 backdrop-blur-sm z-10 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <Video className="w-12 h-12 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">In arrivo!</h3>
                                <p className="text-gray-400 mb-6 max-w-md">
                                    Stiamo lavorando per portarti la migliore esperienza di generazione video AI
                                </p>

                                {!isSubscribed ? (
                                    <form onSubmit={handleWaitlist} className="flex gap-3 max-w-md mx-auto">
                                        <Input
                                            type="email"
                                            placeholder="La tua email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Button type="submit">
                                            <Bell className="w-4 h-4" />
                                            Avvisami
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 text-green-400">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Perfetto! Ti avviseremo al lancio.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Blurred Preview */}
                        <div className="opacity-30">
                            <div className="mb-6">
                                <label className="block text-white font-medium mb-3">
                                    Descrivi il tuo video
                                </label>
                                <textarea
                                    placeholder="Es: Un drone che sorvola una città futuristica al tramonto..."
                                    rows={4}
                                    disabled
                                    className="w-full bg-[#0a0a12] border border-[#2a2a4a] rounded-xl p-4 text-white placeholder-gray-500"
                                />
                            </div>
                            <Button disabled className="w-full">
                                <Zap className="w-5 h-5" />
                                Genera Video
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-xl font-bold text-white text-center mb-6">
                        Cosa potrai fare
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <Card key={index} hover={false}>
                                <feature.icon className="w-8 h-8 text-purple-400 mb-3" />
                                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-8"
                >
                    <p className="text-gray-400 mb-4">
                        Nel frattempo, inizia con la generazione di immagini
                    </p>
                    <Link href="/generate/images">
                        <Button variant="secondary">
                            Genera Immagini AI
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </>
    );
}
