'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Camera, ChevronRight, Save } from 'lucide-react';

export default function ProfilePage() {
    const [name, setName] = useState('Riccardo');
    const [email, setEmail] = useState('riccardo@ariele.academy');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-8 text-white">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Profile Header */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[#12121e]/80 backdrop-blur-xl border border-white/10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Riccardo"
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-xl border border-white/20 shadow-xl hover:bg-indigo-500 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {name}
                            </h1>
                            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                                <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                                    Student Pro
                                </span>
                                • {email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Account Information */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold">
                            <User className="w-5 h-5 text-indigo-400" />
                            Informazioni Account
                        </div>
                        <div className="p-6 rounded-2xl bg-[#12121e]/50 backdrop-blur-md border border-white/10 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Nome Completo</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                    />
                                    <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-focus-within:border-indigo-500/30 transition-all opacity-0 group-focus-within:opacity-100" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Email</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                    />
                                    <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-focus-within:border-indigo-500/30 transition-all opacity-0 group-focus-within:opacity-100" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security & Preferences */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold">
                            <Shield className="w-5 h-5 text-purple-400" />
                            Sicurezza e Preferenze
                        </div>
                        <div className="p-6 rounded-2xl bg-[#12121e]/50 backdrop-blur-md border border-white/10 space-y-3">
                            {[
                                { icon: Shield, label: 'Cambia Password', color: 'text-indigo-400' },
                                { icon: Bell, label: 'Notifiche', color: 'text-purple-400' },
                                { icon: User, label: 'Privacy', color: 'text-pink-400' },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-[#0a0a12] border border-white/10 ${item.color}`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-gray-200">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Save Button */}
                <motion.div variants={itemVariants} className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`
                            relative flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all overflow-hidden
                            ${isSaving ? 'bg-indigo-500/50 scale-95 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.3)]'}
                        `}
                    >
                        {/* Premium Button Glass Effect */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" />

                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Salvataggio...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Salva Modifiche
                            </>
                        )}

                        {/* Liquid Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                            }}
                        />
                    </button>
                </motion.div>
            </motion.div>

            {/* Ambient Background Glows */}
            <div className="fixed top-1/4 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] -z-10" />
            <div className="fixed bottom-1/4 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10" />
        </div>
    );
}
