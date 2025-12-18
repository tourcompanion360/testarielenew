'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, BookOpen, Image, Video, MessageSquare, Trophy,
    ChevronRight, Settings, Home, BarChart2, Bookmark, User
} from 'lucide-react';

const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/courses', icon: BookOpen, label: 'Corsi' },
    { href: '/generate/images', icon: Image, label: 'Genera Immagini' },
    { href: '/generate/videos', icon: Video, label: 'Genera Video' },
    { href: '/prompts', icon: MessageSquare, label: 'Prompt library' },
    { href: '/profile', icon: Settings, label: 'Impostazioni' },
];

const mobileNavItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/courses', icon: BarChart2, label: 'Classifica' },
    { href: '/prompts', icon: Bookmark, label: 'Preferiti' },
    { href: '/profile', icon: User, label: 'Profilo' },
];

interface SidebarProps {
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed: controlledCollapsed, onCollapsedChange }: SidebarProps) {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [navPositions, setNavPositions] = useState<{ top: number; height: number }[]>([]);
    const [mobileNavPositions, setMobileNavPositions] = useState<{ left: number; width: number }[]>([]);
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const mobileNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navContainerRef = useRef<HTMLElement>(null);
    const mobileNavContainerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const collapsed = controlledCollapsed ?? internalCollapsed;
    const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

    // Find active index based on pathname
    useEffect(() => {
        const index = navItems.findIndex(item => {
            if (item.href === '/') return pathname === '/';
            return pathname !== '#' && item.href !== '#' && pathname.startsWith(item.href);
        });
        if (index !== -1) setActiveIndex(index);

        const mIndex = mobileNavItems.findIndex(item => {
            if (item.href === '/') return pathname === '/';
            return pathname !== '#' && item.href !== '#' && pathname.startsWith(item.href);
        });
        if (mIndex !== -1) setMobileActiveIndex(mIndex);
    }, [pathname]);

    // Calculate positions of nav items for desktop
    useEffect(() => {
        const updatePositions = () => {
            if (!navContainerRef.current) return;

            const containerRect = navContainerRef.current.getBoundingClientRect();
            const positions = navRefs.current.map(ref => {
                if (!ref) return { top: 0, height: 0 };
                const rect = ref.getBoundingClientRect();
                return {
                    top: rect.top - containerRect.top,
                    height: rect.height,
                };
            });
            setNavPositions(positions);
        };

        updatePositions();
        const timeoutId = setTimeout(updatePositions, 350);
        window.addEventListener('resize', updatePositions);
        return () => {
            window.removeEventListener('resize', updatePositions);
            clearTimeout(timeoutId);
        };
    }, [collapsed]);

    // Calculate positions for mobile
    useEffect(() => {
        const updateMobilePositions = () => {
            if (!mobileNavContainerRef.current) return;

            const containerRect = mobileNavContainerRef.current.getBoundingClientRect();
            const positions = mobileNavRefs.current.map(ref => {
                if (!ref) return { left: 0, width: 0 };
                const rect = ref.getBoundingClientRect();
                return {
                    left: rect.left - containerRect.left,
                    width: rect.width,
                };
            });
            setMobileNavPositions(positions);
        };

        updateMobilePositions();
        window.addEventListener('resize', updateMobilePositions);
        return () => window.removeEventListener('resize', updateMobilePositions);
    }, []);

    const handleNavClick = (index: number, href: string) => (e: React.MouseEvent) => {
        if (href === '#') {
            e.preventDefault();
            return;
        }
    };

    const currentPosition = navPositions[activeIndex] || { top: 0, height: 48 };
    const currentMobilePosition = mobileNavPositions[mobileActiveIndex] || { left: 0, width: 0 };

    return (
        <>
            <aside className={`fixed left-0 top-0 h-full transition-all duration-300 z-20 hidden md:block ${collapsed ? 'w-20' : 'w-64'}`}>
                {/* Liquid Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,30,0.85)] to-[rgba(10,10,18,0.95)] backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-50" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                {/* Liquid Glass Highlight */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-white">
                                {collapsed ? 'A' : 'Ariele'}
                            </span>
                        </Link>
                    </div>

                    {/* Navigation with Animated Selector */}
                    <nav ref={navContainerRef} className="px-3 space-y-1 flex-1 relative">
                        {/* Animated Liquid Glass Selector */}
                        <motion.div
                            className="absolute left-3 right-3 rounded-xl pointer-events-none"
                            initial={false}
                            animate={{
                                top: currentPosition.top,
                                height: currentPosition.height,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 30,
                                mass: 1,
                            }}
                        >
                            {/* Liquid Glass Selector Background */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
                                <div className="absolute inset-0 rounded-xl border border-white/30" />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent" />
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
                            </div>
                            <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-xl -z-10" />
                        </motion.div>

                        {/* Nav Items */}
                        {navItems.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <Link
                                    key={item.label}
                                    ref={(el) => { navRefs.current[index] = el; }}
                                    href={item.href}
                                    onClick={handleNavClick(index, item.href)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${isActive
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-indigo-400' : ''}`} />
                                    {!collapsed && (
                                        <span className="font-medium">{item.label}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Collapse Button */}
                    <div className="p-4">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10"
                        >
                            <ChevronRight className={`w-5 h-5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-6 left-6 right-6 h-20 z-50 md:hidden">
                {/* Liquid Glass Background */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[rgba(18,18,30,0.85)] to-[rgba(10,10,18,0.95)] backdrop-blur-xl border border-white/10 shadow-2xl" />
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent opacity-50" />

                {/* Content */}
                <nav ref={mobileNavContainerRef} className="relative h-full flex items-center justify-around px-4">
                    {/* Animated Mobile Selector */}
                    <motion.div
                        className="absolute top-2 bottom-2 rounded-2xl pointer-events-none"
                        initial={false}
                        animate={{
                            left: currentMobilePosition.left,
                            width: currentMobilePosition.width,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                            mass: 1,
                        }}
                    >
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
                            <div className="absolute inset-0 rounded-2xl border border-white/30" />
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
                        </div>
                        <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-xl -z-10" />
                    </motion.div>

                    {mobileNavItems.map((item, index) => {
                        const isActive = mobileActiveIndex === index;
                        return (
                            <Link
                                key={item.label}
                                ref={(el) => { mobileNavRefs.current[index] = el; }}
                                href={item.href}
                                onClick={handleNavClick(index, item.href)}
                                className={`relative flex flex-col items-center justify-center gap-1 w-full h-full rounded-2xl transition-all duration-200 ${isActive
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-indigo-400' : ''}`} />
                                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a12] flex relative overflow-hidden">
            {/* Global Background Theme */}
            <div className="fixed inset-0 bg-gradient-to-b from-[rgba(18,18,30,1)] to-[rgba(10,10,18,1)] z-0" />
            <div className="fixed inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-0 pointer-events-none" />

            {/* Ambient Glows */}
            <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-500/5 to-transparent z-0 pointer-events-none" />
            <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-500/5 to-transparent z-0 pointer-events-none" />

            <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
            <main className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'} ml-0 pb-32 md:pb-0 relative z-10`}>
                {children}
            </main>
        </div>
    );
}
