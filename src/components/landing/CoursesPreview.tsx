'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Lock } from 'lucide-react';
import { Card, Button } from '@/components/ui';

// Demo courses data
const courses = [
    {
        id: '1',
        title: 'Mastering AI Video Creation',
        description: 'Crea video cinematografici con AI. Da zero a pro con Runway e Pika.',
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        duration: '4h 30min',
        lessons: 24,
        rating: 4.9,
    },
    {
        id: '2',
        title: 'Video Editing Masterclass',
        description: 'Impara l\'arte del montaggio video professionale per i social media.',
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        duration: '12h 15min',
        lessons: 56,
        rating: 4.8,
    },
    {
        id: '3',
        title: 'Freelancing: Trova Clienti',
        description: 'Costruisci il tuo business e trova clienti alto-paganti.',
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
        duration: '6h 45min',
        lessons: 32,
        rating: 4.9,
    },
];

export function CoursesPreview() {
    return (
        <section className="py-20 sm:py-32 bg-[#0c0c16]">
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
                        Corsi per ogni
                        <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"> livello</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Dalla teoria alla pratica. Impara a creare contenuti AI professionali con i nostri tutorial step-by-step.
                    </p>
                </motion.div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden p-0 group">
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </div>

                                    {/* Premium Badge */}

                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                                    {/* Meta */}
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
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link href="/courses">
                        <Button size="lg">
                            Esplora Tutti i Corsi
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
