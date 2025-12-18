'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Sparkles, Users, BookOpen, Image, DollarSign,
    TrendingUp, Settings, LogOut, Plus, Search,
    MoreVertical, Eye, Edit, Trash2, ChevronRight,
    BarChart3, MessageSquare, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';

// Demo admin data
const statsData = {
    totalUsers: 1247,
    activeUsers: 342,
    totalCourses: 12,
    totalRevenue: 15480,
    imagesGenerated: 45230,
    chatMessages: 12890,
};

const recentUsers = [
    { id: '1', name: 'Marco Rossi', email: 'marco@example.com', plan: 'Pro', joined: '2 ore fa' },
    { id: '2', name: 'Laura Bianchi', email: 'laura@example.com', plan: 'Free', joined: '5 ore fa' },
    { id: '3', name: 'Giovanni Verdi', email: 'giovanni@example.com', plan: 'Business', joined: 'Ieri' },
    { id: '4', name: 'Sara Neri', email: 'sara@example.com', plan: 'Pro', joined: 'Ieri' },
];

const courses = [
    { id: '1', title: 'Fondamenti di AI Art', students: 342, rating: 4.9, status: 'active' },
    { id: '2', title: 'Masterclass DALL-E 3', students: 215, rating: 4.8, status: 'active' },
    { id: '3', title: 'Video AI con Runway', students: 178, rating: 4.7, status: 'draft' },
];

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('ariele_user');
        if (!storedUser) {
            router.push('/auth/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('ariele_user');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-[#12121e] border-r border-[#2a2a4a] p-6 hidden lg:block">
                <Link href="/" className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Ariele</span>
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Admin</span>
                </Link>

                <nav className="space-y-2">
                    {[
                        { href: '/dashboard/admin', icon: BarChart3, label: 'Overview', active: true },
                        { href: '#', icon: Users, label: 'Utenti' },
                        { href: '#', icon: BookOpen, label: 'Corsi' },
                        { href: '#', icon: Image, label: 'Generazioni' },
                        { href: '#', icon: MessageSquare, label: 'Prompt' },
                        { href: '#', icon: DollarSign, label: 'Pagamenti' },
                        { href: '#', icon: Settings, label: 'Impostazioni' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Esci</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64">
                <header className="bg-[#12121e] border-b border-[#2a2a4a] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-gray-400">Panoramica della piattaforma</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="secondary" size="sm">
                                <Plus className="w-4 h-4" />
                                Nuovo Corso
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {[
                            { label: 'Utenti Totali', value: statsData.totalUsers.toLocaleString(), icon: Users, color: 'indigo', trend: '+12%' },
                            { label: 'Utenti Attivi', value: statsData.activeUsers.toLocaleString(), icon: TrendingUp, color: 'green', trend: '+8%' },
                            { label: 'Corsi', value: statsData.totalCourses, icon: BookOpen, color: 'yellow', trend: '+2' },
                            { label: 'Ricavi (€)', value: statsData.totalRevenue.toLocaleString(), icon: DollarSign, color: 'pink', trend: '+24%' },
                            { label: 'Immagini AI', value: statsData.imagesGenerated.toLocaleString(), icon: Image, color: 'purple', trend: '+456' },
                            { label: 'Chat AI', value: statsData.chatMessages.toLocaleString(), icon: MessageSquare, color: 'cyan', trend: '+1.2k' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card hover={false} className="relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}-500/10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-3`} />
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {stat.trend}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Users */}
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-white">Nuovi utenti</h2>
                                <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                                    Vedi tutti <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-[#0a0a12] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.plan === 'Business' ? 'bg-purple-500/20 text-purple-400' :
                                                    user.plan === 'Pro' ? 'bg-indigo-500/20 text-indigo-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {user.plan}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Courses */}
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-white">Gestione corsi</h2>
                                <Button variant="secondary" size="sm">
                                    <Plus className="w-4 h-4" />
                                    Aggiungi
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {courses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between p-3 bg-[#0a0a12] rounded-xl">
                                        <div>
                                            <p className="text-white font-medium">{course.title}</p>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {course.students}
                                                </span>
                                                <span className="flex items-center gap-1 text-yellow-400">
                                                    ★ {course.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${course.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {course.status === 'active' ? 'Attivo' : 'Bozza'}
                                            </span>
                                            <button className="p-2 hover:bg-white/10 rounded-lg">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <h2 className="text-lg font-semibold text-white mb-4">Azioni rapide</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: BookOpen, label: 'Nuovo corso', color: 'indigo' },
                                { icon: MessageSquare, label: 'Nuovo prompt', color: 'green' },
                                { icon: Users, label: 'Invita utente', color: 'yellow' },
                                { icon: Settings, label: 'Configurazione', color: 'gray' },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="p-4 bg-[#0a0a12] rounded-xl hover:bg-[#12121e] transition-colors text-left"
                                >
                                    <action.icon className={`w-6 h-6 text-${action.color}-400 mb-2`} />
                                    <p className="text-white font-medium">{action.label}</p>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
