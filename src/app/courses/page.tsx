'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Search, Filter, Play, Clock, Star, Lock, ChevronDown
} from 'lucide-react';
import { Card, Button, SidebarLayout } from '@/components/ui';

// Demo courses data
const allCourses = [
    {
        id: '1',
        title: 'Mastering AI Video Creation',
        category: 'Video AI',
        duration: '4h 30m',
        lessons: 24,
        students: 1234,
        rating: 4.9,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Impara a creare video professionali e cinematografici utilizzando gli ultimi strumenti di intelligenza artificiale come Runway Gen-2 e Pika Labs.',
        progress: 0,
        isPremium: false,
    },
    {
        id: '2',
        title: 'Video Editing Masterclass',
        category: 'Editing',
        duration: '12h 15m',
        lessons: 56,
        students: 856,
        rating: 4.8,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Dalle basi al montaggio avanzato. Impara a editare come un professionista con Adobe Premiere Pro e DaVinci Resolve.',
        progress: 0,
        isPremium: false,
    },
    {
        id: '3',
        title: 'Freelancing: Trova Clienti',
        category: 'Business',
        duration: '6h 45m',
        lessons: 32,
        students: 2105,
        rating: 4.9,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Strategie pratiche per trovare i tuoi primi clienti, negoziare prezzi alti e costruire un business di content creation sostenibile.',
        progress: 0,
        isPremium: false,
    },
    {
        id: '4',
        title: 'Social Media Growth',
        category: 'Marketing',
        duration: '5h 20m',
        lessons: 28,
        students: 1543,
        rating: 4.7,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Usa l\'AI per automatizzare la tua strategia di contenuti e crescere organicamente su Instagram, TikTok e YouTube.',
        progress: 0,
        isPremium: false,
    },
    {
        id: '5',
        title: 'Prompt Engineering Pro',
        category: 'AI Skills',
        duration: '8h 10m',
        lessons: 45,
        students: 3421,
        rating: 4.8,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Diventa un esperto nel comunicare con l\'AI. Scrivi prompt perfetti per Midjourney, DALL-E 3 e Stable Diffusion.',
        progress: 0,
        isPremium: false,
    },
    {
        id: '6',
        title: 'Workflow Creativo Ottimizzato',
        category: 'Produttività',
        duration: '3h 30m',
        lessons: 15,
        students: 980,
        rating: 4.6,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        description: 'Come organizzare il tuo lavoro, gestire i file e velocizzare la produzione di contenuti con tool di automazione.',
        progress: 0,
        isPremium: false,
    },
];

const categories = ['Tutti', 'Principiante', 'Intermedio', 'Avanzato'];

export default function CoursesPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tutti');
    const [showFilters, setShowFilters] = useState(false);

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'Tutti' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Corsi</h1>
                        <p className="text-gray-400">Esplora tutti i corsi disponibili</p>
                    </div>
                </div>
            </header>

            <div className="p-6">
                {/* Search and Filters */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cerca corsi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-[#2a2a4a] rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setShowFilters(!showFilters)}
                            className="sm:w-auto"
                        >
                            <Filter className="w-5 h-5" />
                            Filtri
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </Button>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 flex flex-wrap gap-2"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-[#2a2a4a]'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/courses/${course.id}`}>
                                <Card className="overflow-hidden p-0 group h-full">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        </div>



                                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300">
                                            {course.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {course.duration}
                                                </span>
                                                <span>{course.lessons} lezioni</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                {course.rating}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">Nessun corso trovato con questi filtri.</p>
                        <Button
                            variant="secondary"
                            className="mt-4"
                            onClick={() => {
                                setSearch('');
                                setSelectedCategory('Tutti');
                            }}
                        >
                            Rimuovi filtri
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
