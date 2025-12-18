'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Image, Video, MessageSquare, Trophy,
  ChevronRight, Play, Zap, Star, Award, Palette
} from 'lucide-react';
import { Button, Card, SidebarLayout } from '@/components/ui';

// Demo data
const stats = {
  coursesCompleted: 3,
  coursesInProgress: 2,
  imagesGenerated: 47,
  promptsSaved: 12,
};

const recentCourses = [
  {
    id: '1',
    title: 'Mastering AI Video Creation',
    progress: 75,
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
    lastAccessed: '2 ore fa',
  },
  {
    id: '2',
    title: 'Video Editing Masterclass',
    progress: 30,
    thumbnail: 'https://img-c.udemycdn.com/course/750x422/5382116_b978.jpg',
    lastAccessed: 'Ieri',
  },
];

const recentGenerations = [
  { id: '1', url: '/generations/dog_night.png' },
  { id: '2', url: '/generations/brain_media.jpg' },
  { id: '3', url: '/generations/alien_cyberpunk.png' },
  { id: '4', url: '/generations/robot_screens.png' },
];

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Benvenuto nella piattaforma Ariele! 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/generate/images">
              <Button className="text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2">
                <Zap className="w-4 h-4" />
                Genera AI
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Corsi Completati', value: stats.coursesCompleted, icon: BookOpen, color: 'from-indigo-500 to-blue-500' },
            { label: 'In Progresso', value: stats.coursesInProgress, icon: Play, color: 'from-yellow-500 to-orange-500' },
            { label: 'Immagini Generate', value: stats.imagesGenerated, icon: Image, color: 'from-pink-500 to-rose-500' },
            { label: 'Prompt Salvati', value: stats.promptsSaved, icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover={false} className="relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
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
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Continua a imparare
                </h2>
                <Link href="/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                  Vedi tutti <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <div className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-28 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
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
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  Ultime creazioni AI
                </h2>
                <Link href="/generate/images" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                  Genera nuova <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {recentGenerations.map((gen) => (
                  <motion.div
                    key={gen.id}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors"
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

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Azioni rapide
              </h2>
              <div className="space-y-3">
                <Link href="/generate/images">
                  <Button variant="secondary" className="w-full justify-start">
                    <Image className="w-4 h-4 text-pink-400" />
                    Genera immagine AI
                  </Button>
                </Link>
                <Link href="/generate/videos">
                  <Button variant="secondary" className="w-full justify-start">
                    <Video className="w-4 h-4 text-purple-400" />
                    Genera video AI
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
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Traguardi
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Prima Generazione', icon: Zap, earned: true },
                  { name: 'Prompt Expert', icon: Star, earned: true },
                  { name: '10 Corsi', icon: BookOpen, earned: false },
                  { name: 'Master Creator', icon: Trophy, earned: false },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl text-center ${achievement.earned
                      ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                      : 'bg-white/5 opacity-50'
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


          </div>
        </div>
      </div>
    </>
  );
}
