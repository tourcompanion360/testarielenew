'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { Button, Input, Card, SidebarLayout } from '@/components/ui';
import { pricingPlans } from '@/lib/stripe/client';

const planIcons = { free: Sparkles, pro: Zap, business: Building2 };

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'ARIELE20') setCouponApplied(true);
    };

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div>
                    <h1 className="text-2xl font-bold text-white">Abbonamenti</h1>
                    <p className="text-gray-400">Scegli il piano perfetto per te</p>
                </div>
            </header>

            <div className="p-6">
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-4 p-1 bg-white/5 rounded-xl">
                        <button onClick={() => setBillingPeriod('month')} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${billingPeriod === 'month' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>Mensile</button>
                        <button onClick={() => setBillingPeriod('year')} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${billingPeriod === 'year' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                            Annuale<span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">-20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                    {pricingPlans.map((plan, index) => {
                        const Icon = planIcons[plan.id as keyof typeof planIcons] || Sparkles;
                        const price = billingPeriod === 'year' ? Math.round(plan.price * 12 * 0.8) : plan.price;
                        const displayPrice = couponApplied && plan.price > 0 ? Math.round(price * 0.8) : price;

                        return (
                            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                                className={`relative rounded-2xl p-6 ${plan.highlighted ? 'bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500' : 'bg-white/5 border border-[#2a2a4a]'}`}>
                                {plan.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />Più Popolare
                                    </div>
                                )}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.highlighted ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-[#252542]'}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                <div className="mb-6">
                                    {couponApplied && plan.price > 0 && <span className="text-gray-500 line-through text-lg mr-2">€{price}</span>}
                                    <span className="text-3xl font-bold text-white">€{displayPrice}</span>
                                    <span className="text-gray-400 text-sm">/{billingPeriod === 'year' ? 'anno' : 'mese'}</span>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                                    {plan.price === 0 ? 'Piano Attuale' : 'Scegli Piano'}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="max-w-md mx-auto">
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">Hai un codice sconto?</h3>
                        <div className="flex gap-3">
                            <Input placeholder="Inserisci codice" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} disabled={couponApplied} />
                            <Button variant="secondary" onClick={handleApplyCoupon} disabled={couponApplied || !couponCode}>
                                {couponApplied ? <Check className="w-4 h-4" /> : 'Applica'}
                            </Button>
                        </div>
                        {couponApplied && <p className="text-green-400 text-sm mt-2 text-center">Sconto del 20% applicato!</p>}
                    </Card>
                </div>
            </div>
        </>
    );
}
