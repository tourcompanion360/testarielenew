'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Sparkles, Copy, Check, Search, Filter, Lock,
    Image, Palette, Camera, Wand2, ChevronDown, Heart, ExternalLink
} from 'lucide-react';
import { Button, Card, Modal, SidebarLayout } from '@/components/ui';

// Demo prompts data - Prompt library style
const prompts = [
    {
        id: '1',
        title: 'Ritratto Cinematico',
        category: 'Ritratti',
        icon: Camera,
        content: 'A cinematic portrait of [SUBJECT], dramatic lighting from the left side, shallow depth of field, film grain, anamorphic lens flare, shot on ARRI Alexa, 85mm lens, color graded in DaVinci Resolve, moody atmosphere, professional photography',
        tags: ['ritratto', 'cinema', 'professionale'],
        isPremium: false,
        likes: 234,
    },
    {
        id: '2',
        title: 'Paesaggio Fantasy',
        category: 'Paesaggi',
        icon: Image,
        content: 'An epic fantasy landscape featuring [DESCRIPTION], ethereal lighting, volumetric fog, bioluminescent elements, magical atmosphere, painted by Greg Rutkowski and Alphonse Mucha, highly detailed, 8k resolution, trending on ArtStation',
        tags: ['fantasy', 'paesaggio', 'arte'],
        isPremium: false,
        likes: 189,
    },
    {
        id: '3',
        title: 'Prodotto E-commerce',
        category: 'Prodotti',
        icon: Palette,
        content: 'Professional product photography of [PRODUCT], clean white background, soft box lighting, reflection on glossy surface, commercial advertising style, ultra high resolution, perfect for e-commerce, studio setup',
        tags: ['prodotto', 'ecommerce', 'commerciale'],
        isPremium: false,
        likes: 156,
    },
    {
        id: '4',
        title: 'Neon Cyberpunk',
        category: 'Futuristico',
        icon: Sparkles,
        content: 'Cyberpunk scene with [SUBJECT], neon lights in pink and cyan, rain-slicked streets, holographic advertisements, blade runner aesthetic, night photography, ultra detailed, volumetric lighting, city reflections',
        tags: ['cyberpunk', 'neon', 'futuristico'],
        isPremium: false,
        likes: 321,
    },
    {
        id: '5',
        title: 'Stile Anime',
        category: 'Illustrazione',
        icon: Wand2,
        content: 'Anime illustration of [CHARACTER], Studio Ghibli inspired, soft pastel colors, detailed background, cel shading, dreamy atmosphere, high quality anime art, trending on Pixiv, beautiful lighting',
        tags: ['anime', 'illustrazione', 'ghibli'],
        isPremium: false,
        likes: 445,
    },
    {
        id: '6',
        title: 'Architettura Moderna',
        category: 'Architettura',
        icon: Image,
        content: 'Architectural visualization of [BUILDING], minimalist design, concrete and glass, natural lighting, landscaping, photorealistic render, Unreal Engine 5, professional architectural photography',
        tags: ['architettura', 'moderno', 'render'],
        isPremium: false,
        likes: 167,
    },
];

const categories = ['Tutti', 'Ritratti', 'Paesaggi', 'Prodotti', 'Futuristico', 'Illustrazione', 'Architettura'];

export default function PromptsPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tutti');
    const [showFilters, setShowFilters] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<typeof prompts[0] | null>(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(search.toLowerCase()) ||
            prompt.content.toLowerCase().includes(search.toLowerCase()) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = selectedCategory === 'Tutti' || prompt.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCopy = (prompt: typeof prompts[0]) => {


        navigator.clipboard.writeText(prompt.content);
        setCopiedId(prompt.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleViewPrompt = (prompt: typeof prompts[0]) => {

        setSelectedPrompt(prompt);
    };

    const handleOpenAIUrl = (prompt: typeof prompts[0], url: string) => {
        navigator.clipboard.writeText(prompt.content);
        window.open(url, '_blank');
        setCopiedId(prompt.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Wand2 className="w-8 h-8 text-indigo-400" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Prompt library</h1>
                        <p className="text-gray-400">Prompt pronti all'uso per le tue creazioni</p>
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
                                placeholder="Cerca prompts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-[#2a2a4a] rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-5 h-5" />
                            Categorie
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
                                        : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2a2a4a]'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Prompts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPrompts.map((prompt, index) => (
                        <motion.div
                            key={prompt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="h-full flex flex-col group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#252542]">
                                            <prompt.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white flex items-center gap-2">
                                                {prompt.title}

                                            </h3>
                                            <p className="text-sm text-gray-500">{prompt.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Heart className="w-4 h-4" />
                                        <span className="text-sm">{prompt.likes}</span>
                                    </div>
                                </div>

                                <div
                                    className="flex-1 p-4 bg-[#0a0a12] rounded-xl mb-4 cursor-pointer hover:bg-[#12121e] transition-colors"
                                    onClick={() => handleViewPrompt(prompt)}
                                >
                                    <p className="text-gray-400 text-sm line-clamp-4">
                                        {prompt.content}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {prompt.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-[#252542] rounded-full text-xs text-gray-400"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full justify-center"
                                        onClick={() => handleCopy(prompt)}
                                    >
                                        {copiedId === prompt.id ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-400" />
                                                Copiato!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copia Prompt
                                            </>
                                        )}
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30"
                                            onClick={() => handleOpenAIUrl(prompt, 'https://chat.openai.com')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold">ChatGPT</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30"
                                            onClick={() => handleOpenAIUrl(prompt, 'https://gemini.google.com')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold">Gemini</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredPrompts.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Nessun prompt trovato con questi filtri.</p>
                    </div>
                )}
            </div>

            {/* Prompt Detail Modal */}
            <Modal
                isOpen={!!selectedPrompt}
                onClose={() => setSelectedPrompt(null)}
                title={selectedPrompt?.title}
                size="lg"
            >
                {selectedPrompt && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <selectedPrompt.icon className="w-4 h-4" />
                            <span>{selectedPrompt.category}</span>
                            <span>•</span>
                            <Heart className="w-4 h-4" />
                            <span>{selectedPrompt.likes} likes</span>
                        </div>

                        <div className="p-4 bg-[#0a0a12] rounded-xl">
                            <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                {selectedPrompt.content}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {selectedPrompt.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-[#252542] rounded-full text-sm text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <Button
                                className="w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedPrompt.content);
                                    setCopiedId(selectedPrompt.id);
                                    setTimeout(() => {
                                        setCopiedId(null);
                                    }, 1500);
                                }}
                            >
                                {copiedId === selectedPrompt.id ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copiato negli appunti!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copia Prompt
                                    </>
                                )}
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
                                    onClick={() => handleOpenAIUrl(selectedPrompt, 'https://chat.openai.com')}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Apri in ChatGPT</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </Button>
                                <Button
                                    className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    onClick={() => handleOpenAIUrl(selectedPrompt, 'https://gemini.google.com')}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Apri in Gemini</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>


        </>
    );
}
