'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wand2, Download, Share2, Heart, RefreshCw,
    Image as ImageIcon, Palette, Camera, Mountain, Zap
} from 'lucide-react';
import { Button, Card, SidebarLayout } from '@/components/ui';
import { generateImage } from '@/lib/openai/client';

const stylePresets = [
    { id: 'vivid', name: 'Vivido', icon: Palette, description: 'Colori intensi e saturi' },
    { id: 'natural', name: 'Naturale', icon: Camera, description: 'Look fotografico realistico' },
    { id: 'artistic', name: 'Artistico', icon: Wand2, description: 'Stile pittorico e creativo' },
    { id: 'cinematic', name: 'Cinematico', icon: Mountain, description: 'Effetti film e drammatici' },
];

const promptSuggestions = [
    'Un gatto astronauta che fluttua nello spazio con la Terra sullo sfondo',
    'Una città futuristica al tramonto con macchine volanti',
    'Un castello medievale su una montagna avvolto nella nebbia',
    'Un ritratto surreale con fiori che crescono dai capelli',
    'Un drago di cristallo che vola sopra un oceano al chiaro di luna',
];

const demoImages = [
    { id: '1', url: '/generations/dog_night.png', prompt: 'Pomeranian dog, night vision security camera style, black and white, slightly grainy' },
    { id: '2', url: '/generations/brain_media.jpg', prompt: 'Floating digital brain connected to a curved wall of multiple screens displaying media content, purple and blue ambient lighting' },
    { id: '3', url: '/generations/alien_cyberpunk.png', prompt: 'Green alien head with large expressive eyes wearing futuristic sunglasses, cyberpunk street background with neon signs' },
    { id: '4', url: '/generations/robot_screens.png', prompt: 'Humanoid robot with a glossy white head looking at multiple futuristic displays, moody blue lighting' },
];

export default function ImageGenerationPage() {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('vivid');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState(demoImages);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);

        try {
            const result = await generateImage(prompt, selectedStyle);

            if (result.success && result.imageUrl) {
                const newImage = {
                    id: Date.now().toString(),
                    url: result.imageUrl,
                    prompt: prompt,
                };
                setGeneratedImages([newImage, ...generatedImages]);
                setSelectedImage(newImage.url);
            }
        } catch (error) {
            console.error('Generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <header className="bg-[#12121e]/80 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Genera Immagini AI</h1>
                        <p className="text-gray-400">Powered by Nano Banana Pro</p>
                    </div>
                </div>
            </header>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Generation Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Prompt Input */}
                        <Card>
                            <label className="block text-white font-medium mb-3">
                                Descrivi la tua immagine
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Es: Un astronauta che cammina su Marte con la Terra visibile all'orizzonte, stile cinematico..."
                                rows={4}
                                className="w-full bg-white/5 border border-[#2a2a4a] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                            />

                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Suggerimenti rapidi:</p>
                                <div className="flex flex-wrap gap-2">
                                    {promptSuggestions.slice(0, 3).map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setPrompt(suggestion)}
                                            className="px-3 py-1.5 bg-white/5 border border-[#2a2a4a] rounded-full text-xs text-gray-400 hover:text-white hover:border-indigo-500 transition-colors"
                                        >
                                            {suggestion.slice(0, 40)}...
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Style Selection */}
                        <Card>
                            <label className="block text-white font-medium mb-4">
                                Scegli uno stile
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {stylePresets.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={`relative p-4 rounded-xl border transition-all duration-300 group ${selectedStyle === style.id
                                            ? 'border-white/30'
                                            : 'bg-white/[0.03] backdrop-blur-sm border-[#2a2a4a] hover:border-indigo-500/30'
                                            }`}
                                    >
                                        <AnimatePresence>
                                            {selectedStyle === style.id && (
                                                <motion.div
                                                    layoutId="style-selector"
                                                    className="absolute inset-0 z-0"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 350,
                                                        damping: 30,
                                                        mass: 1
                                                    }}
                                                >
                                                    {/* Main glass background */}
                                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl" />

                                                    {/* Top highlight */}
                                                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />

                                                    {/* Inner color glow */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20 rounded-xl" />

                                                    {/* Bottom reflection */}
                                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent rounded-b-xl" />

                                                    {/* Outer Shadow Glow */}
                                                    <div className="absolute -inset-1 bg-indigo-500/20 blur-xl -z-10" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="relative z-10">
                                            <style.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${selectedStyle === style.id ? 'text-white' : 'text-gray-400 group-hover:text-indigo-300'
                                                }`} />
                                            <p className={`text-sm font-medium transition-colors duration-300 ${selectedStyle === style.id ? 'text-white' : 'text-gray-300'}`}>{style.name}</p>
                                            <p className={`text-xs mt-1 transition-colors duration-300 ${selectedStyle === style.id ? 'text-white/70' : 'text-gray-500 group-hover:text-gray-400'}`}>{style.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                            className="w-full"
                            size="lg"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generando...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Genera Immagine
                                </>
                            )}
                        </Button>

                        {/* Selected Image Preview */}
                        <AnimatePresence>
                            {selectedImage && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <Card className="p-0 overflow-hidden">
                                        <div className="relative aspect-square">
                                            <img
                                                src={selectedImage}
                                                alt="Generated"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button variant="secondary" size="sm">
                                                    <Download className="w-4 h-4" />
                                                    Scarica
                                                </Button>
                                                <Button variant="secondary" size="sm">
                                                    <Share2 className="w-4 h-4" />
                                                    Condividi
                                                </Button>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                                                <Heart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Gallery Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-indigo-400" />
                                Le tue creazioni
                            </h3>
                            <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
                                {generatedImages.map((image) => (
                                    <motion.button
                                        key={image.id}
                                        onClick={() => setSelectedImage(image.url)}
                                        whileHover={{ scale: 1.05 }}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === image.url ? 'border-indigo-500' : 'border-transparent'
                                            }`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.prompt}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                            {generatedImages.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>Le tue immagini appariranno qui</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
