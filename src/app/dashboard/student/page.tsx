'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Sparkles, BookOpen, Image, MessageSquare, Trophy,
    ChevronRight, Play, Clock, Star, LogOut, Settings,
    User, Zap, TrendingUp, Award, Calendar
} from 'lucide-react';
import { Button, Card } from '@/components/ui';

// Demo user data
const userData = {
    name: 'Marco Rossi',
    email: 'marco@example.com',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    plan: 'Pro Creator',
    joinDate: '2024-01-15',
    stats: {
        coursesCompleted: 3,
        coursesInProgress: 2,
        imagesGenerated: 47,
        promptsSaved: 12,
    },
};

const recentCourses = [
    {
        id: '1',
        title: 'Fondamenti di AI Art',
        progress: 75,
        thumbnail: 'https://picsum.photos/seed/course1/200/120',
        lastAccessed: '2 ore fa',
    },
    {
        id: '2',
        title: 'Masterclass DALL-E 3',
        progress: 30,
        thumbnail: 'https://picsum.photos/seed/course2/200/120',
        lastAccessed: 'Ieri',
    },
];

const recentGenerations = [
    { id: '1', url: 'https://picsum.photos/seed/gen1/150/150', type: 'image' },
    { id: '2', url: 'https://picsum.photos/seed/gen2/150/150', type: 'image' },
    { id: '3', url: 'https://picsum.photos/seed/gen3/150/150', type: 'image' },
    { id: '4', url: 'https://picsum.photos/seed/gen4/150/150', type: 'image' },
];

const achievements = [
    { id: '1', name: 'Prima Generazione', icon: Zap, earned: true },
    { id: '2', name: '10 Corsi Completati', icon: BookOpen, earned: false },
    { id: '3', name: 'Master Creator', icon: Trophy, earned: false },
    { id: '4', name: 'Prompt Expert', icon: Star, earned: true },
];

export default function StudentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(userData);

    useEffect(() => {
        // Check if user is logged in
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
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Ariele</span>
                </Link>

                {/* Navigation */}
                <nav className="space-y-2">
                    {[
                        { href: '/dashboard/student', icon: TrendingUp, label: 'Dashboard', active: true },
                        { href: '/courses', icon: BookOpen, label: 'I Miei Corsi' },
                        { href: '/generate/images', icon: Image, label: 'Genera AI' },
                        { href: '/prompts', icon: MessageSquare, label: 'Prompt library' },
                        { href: '#', icon: Trophy, label: 'Traguardi' },
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

                {/* Logout */}
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
                {/* Header */}
                <header className="bg-[#12121e] border-b border-[#2a2a4a] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                            <p className="text-gray-400">Bentornato, {user.name}! 👋</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm text-white font-medium">{user.name}</p>
                                <p className="text-xs text-indigo-400">{user.plan}</p>
                            </div>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Corsi Completati', value: user.stats.coursesCompleted, icon: BookOpen, color: 'indigo' },
                            { label: 'In Progresso', value: user.stats.coursesInProgress, icon: Play, color: 'yellow' },
                            { label: 'Immagini Generate', value: user.stats.imagesGenerated, icon: Image, color: 'pink' },
                            { label: 'Prompt Salvati', value: user.stats.promptsSaved, icon: MessageSquare, color: 'green' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover={false}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-500/20`}>
                                            <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                            <p className="text-sm text-gray-400">{stat.label}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Continue Learning */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-white">Continua a imparare</h2>
                                    <Link href="/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                                        Vedi tutti <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recentCourses.map((course) => (
                                        <Link key={course.id} href={`/courses/${course.id}`}>
                                            <div className="flex gap-4 p-4 bg-[#0a0a12] rounded-xl hover:bg-[#12121e] transition-colors">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-24 h-16 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-white mb-1">{course.title}</h3>
                                                    <p className="text-sm text-gray-500 mb-2">{course.lastAccessed}</p>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                                                                style={{ width: `${course.progress}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm text-gray-400">{course.progress}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </Card>

                            {/* Recent Generations */}
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-white">Ultime creazioni</h2>
                                    <Link href="/generate/images" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                                        Genera nuova <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {recentGenerations.map((gen) => (
                                        <motion.div
                                            key={gen.id}
                                            whileHover={{ scale: 1.05 }}
                                            className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                                        >
                                            <img
                                                src={gen.url}
                                                alt="Generated"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <h2 className="text-lg font-semibold text-white mb-4">Azioni rapide</h2>
                                <div className="space-y-3">
                                    <Link href="/generate/images">
                                        <Button variant="secondary" className="w-full justify-start">
                                            <Zap className="w-4 h-4 text-yellow-400" />
                                            Genera immagine AI
                                        </Button>
                                    </Link>
                                    <Link href="/prompts">
                                        <Button variant="secondary" className="w-full justify-start">
                                            <MessageSquare className="w-4 h-4 text-green-400" />
                                            Esplora prompt
                                        </Button>
                                    </Link>
                                    <Link href="/courses">
                                        <Button variant="secondary" className="w-full justify-start">
                                            <BookOpen className="w-4 h-4 text-indigo-400" />
                                            Sfoglia corsi
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Achievements */}
                            <Card>
                                <h2 className="text-lg font-semibold text-white mb-4">Traguardi</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {achievements.map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className={`p-3 rounded-xl text-center ${achievement.earned
                                                ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                                                : 'bg-[#0a0a12] opacity-50'
                                                }`}
                                        >
                                            <achievement.icon className={`w-6 h-6 mx-auto mb-2 ${achievement.earned ? 'text-yellow-400' : 'text-gray-600'
                                                }`} />
                                            <p className={`text-xs font-medium ${achievement.earned ? 'text-white' : 'text-gray-500'
                                                }`}>
                                                {achievement.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Upgrade CTA */}
                            {user.plan === 'Free' && (
                                <Card className="bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border-indigo-500/30">
                                    <div className="text-center">
                                        <Award className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                                        <h3 className="font-semibold text-white mb-2">Passa a Pro</h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Sblocca tutti i corsi e le generazioni illimitate
                                        </p>
                                        <Link href="/pricing">
                                            <Button size="sm" className="w-full">Upgrade</Button>
                                        </Link>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
