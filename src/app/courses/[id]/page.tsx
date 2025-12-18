'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, Clock, Star, Users, CheckCircle, Lock, Download, Share2, Heart } from 'lucide-react';
import { Button, Card, SidebarLayout } from '@/components/ui';

const courseData = {
    id: '1',
    title: 'Fondamenti di AI Art',
    description: 'Impara le basi della generazione di immagini AI con prompt efficaci.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2h 30min',
    rating: 4.9,
    students: 342,
    instructor: { name: 'Ariele', avatar: 'https://picsum.photos/seed/instructor/100/100', bio: 'Content Creator & AI Expert' },
    curriculum: [
        { id: '1', title: 'Introduzione al corso', duration: '5:00', completed: true, isLocked: false },
        { id: '2', title: 'Cos\'è l\'AI Art?', duration: '12:30', completed: true, isLocked: false },
        { id: '3', title: 'I principali tool AI', duration: '15:45', completed: false, isLocked: false },
        { id: '4', title: 'Anatomia di un prompt', duration: '18:20', completed: false, isLocked: false },
        { id: '5', title: 'Stili e riferimenti', duration: '14:10', completed: false, isLocked: true },
    ],
    materials: [
        { name: 'Guida ai Prompt.pdf', size: '2.4 MB' },
        { name: 'Template Creativi.zip', size: '15.8 MB' },
    ],
};

export default function CourseDetailPage() {
    const [currentLesson, setCurrentLesson] = useState(0);
    const progress = (courseData.curriculum.filter(l => l.completed).length / courseData.curriculum.length) * 100;

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/courses" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-white">{courseData.title}</h1>
                        <p className="text-gray-400 text-sm">{courseData.curriculum.length} lezioni</p>
                    </div>
                </div>
            </header>

            <div className="bg-black">
                <div className="max-w-5xl mx-auto aspect-video">
                    <iframe src={courseData.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card hover={false}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-white font-medium">Il tuo progresso</span>
                                <span className="text-indigo-400 font-medium">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-3 bg-[#0a0a12] rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                            </div>
                        </Card>

                        <Card hover={false}>
                            <h3 className="text-lg font-semibold text-white mb-3">Descrizione</h3>
                            <p className="text-gray-400">{courseData.description}</p>
                            <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="text-white font-medium">{courseData.rating}</span></div>
                                <div className="flex items-center gap-2"><Users className="w-5 h-5" />{courseData.students} studenti</div>
                                <div className="flex items-center gap-2"><Clock className="w-5 h-5" />{courseData.duration}</div>
                            </div>
                        </Card>

                        <Card hover={false}>
                            <h3 className="text-lg font-semibold text-white mb-4">Materiale incluso</h3>
                            <div className="space-y-3">
                                {courseData.materials.map((m, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a12] rounded-lg">
                                        <div className="flex items-center gap-3"><Download className="w-5 h-5 text-indigo-400" /><span className="text-gray-300">{m.name}</span></div>
                                        <span className="text-gray-500 text-sm">{m.size}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 max-h-[70vh] overflow-y-auto" hover={false}>
                            <h3 className="text-lg font-semibold text-white mb-4">Contenuto del corso</h3>
                            <div className="space-y-2">
                                {courseData.curriculum.map((lesson, index) => (
                                    <button key={lesson.id} onClick={() => !lesson.isLocked && setCurrentLesson(index)} disabled={lesson.isLocked}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${currentLesson === index ? 'bg-indigo-500/20 border border-indigo-500/50' : lesson.isLocked ? 'bg-[#0a0a12] opacity-50 cursor-not-allowed' : 'bg-[#0a0a12] hover:bg-[#12121e]'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-green-500' : lesson.isLocked ? 'bg-gray-700' : 'bg-[#1a1a2e] border border-[#2a2a4a]'}`}>
                                            {lesson.completed ? <CheckCircle className="w-4 h-4 text-white" /> : lesson.isLocked ? <Lock className="w-4 h-4 text-gray-500" /> : <Play className="w-4 h-4 text-gray-400" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${lesson.isLocked ? 'text-gray-500' : 'text-white'}`}>{lesson.title}</p>
                                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-[#2a2a4a]">
                                <Button className="w-full">Continua il corso</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
