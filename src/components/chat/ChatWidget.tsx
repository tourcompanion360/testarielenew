'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { generateChatResponse, knowledgeBase } from '@/lib/openai/client';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const quickPrompts = [
    "Come posso iniziare con l'AI?",
    "Qual è il corso migliore per me?",
    "Come generare immagini AI?",
    "Mostrami i prompt della libreria",
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Ciao! 👋 Sono l\'assistente AI di Ariele. Come posso aiutarti oggi con la creazione di contenuti AI?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
            chatHistory.push({ role: 'user', content: content.trim() });

            // Add system context
            const messagesWithContext = [
                { role: 'system', content: knowledgeBase },
                ...chatHistory,
            ];

            const response = await generateChatResponse(messagesWithContext);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Mi dispiace, ho riscontrato un errore. Riprova tra poco!',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] h-[500px] bg-[#12121e] border border-[#2a2a4a] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 px-4 py-3 border-b border-[#2a2a4a]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Ariele AI Assistant</h3>
                                    <p className="text-xs text-gray-400">Sempre pronto ad aiutarti</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-2 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                            : 'bg-[#1a1a2e] text-gray-200 border border-[#2a2a4a]'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-[#1a1a2e] text-gray-200 border border-[#2a2a4a] px-4 py-3 rounded-2xl">
                                        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Prompts */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2">
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {quickPrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => sendMessage(prompt)}
                                            className="flex-shrink-0 px-3 py-1.5 bg-[#1a1a2e] border border-[#2a2a4a] rounded-full text-xs text-gray-300 hover:border-indigo-500 hover:text-white transition-colors"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-[#2a2a4a]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Scrivi un messaggio..."
                                    className="flex-1 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
