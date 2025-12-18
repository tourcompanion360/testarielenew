'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { pricingPlans } from '@/lib/stripe/client';

export function Pricing() {
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
                        Scegli il piano
                        <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"> perfetto per te</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Inizia gratis e scala quando sei pronto. Nessun impegno, cancella quando vuoi.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 ${plan.highlighted
                                    ? 'bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500'
                                    : 'bg-[#1a1a2e] border border-[#2a2a4a]'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm font-semibold text-white flex items-center gap-1">
                                    <Sparkles className="w-4 h-4" />
                                    Più Popolare
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">€{plan.price}</span>
                                <span className="text-gray-400">/{plan.interval === 'month' ? 'mese' : 'anno'}</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link href="/auth/register">
                                <Button
                                    variant={plan.highlighted ? 'primary' : 'secondary'}
                                    className="w-full"
                                >
                                    {plan.price === 0 ? 'Inizia Gratis' : 'Scegli Piano'}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
