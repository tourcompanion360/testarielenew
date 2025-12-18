'use client';

import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = '', hover = true, glow = false, onClick }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className={`
        bg-[#1a1a2e]/60 backdrop-blur-md border border-[#2a2a4a] rounded-2xl p-6
        transition-all duration-300
        ${hover ? 'hover:border-indigo-500/50 cursor-pointer' : ''}
        ${glow ? 'shadow-lg shadow-indigo-500/10' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
