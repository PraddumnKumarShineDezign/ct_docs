'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';


export default function Header() {
    type Theme = 'light' | 'dark' | 'ocean' | 'sunset' | 'forest';

    const { theme, setTheme } = useTheme();
    const themes = [
        { value: 'light', label: 'Light', color: 'bg-white' },
        { value: 'dark', label: 'Dark', color: 'bg-gray-900' },
        { value: 'ocean', label: 'Ocean', color: 'bg-cyan-600' },
        { value: 'sunset', label: 'Sunset', color: 'bg-orange-500' },
        { value: 'forest', label: 'Forest', color: 'bg-green-700' },
    ];

    function getThemeBgColor(theme: Theme) {
        switch (theme) {
            case 'light':
                return 'hsl(0,0%,100%)';
            case 'dark':
                return 'hsl(0,0%,12%)';
            case 'ocean':
                return 'hsl(200,30%,12%)';
            case 'sunset':
                return 'hsl(20,25%,10%)';
            case 'forest':
                return 'hsl(140,25%,10%)';
            default:
                return 'white';
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Left: Logo + Institute Name */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/assets/logo/hinditechsikha-logo.jpg" // replace with your logo path
                        alt="Institute Logo"
                        width={40}
                        height={40}
                        className="rounded-full shadow-md"
                    />
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
                            Hindi Tech Siksha Computer Training Academy
                        </h1>
                        <p className="text-sm text-blue-100">Empowering Future with Technology</p>
                    </div>
                </motion.div>

                {/* change thems  */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Palette className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {themes.map((t) => (
                            <DropdownMenuItem
                                key={t.value}
                                onClick={() => setTheme(t.value as Theme)}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className={`h-4 w-4 rounded-full border-2 border-foreground/20`}
                                    style={{ backgroundColor: getThemeBgColor(t.value as Theme) }}
                                />
                                <span>{t.label}</span>
                                {theme === t.value && <span className="ml-auto text-primary">✓</span>}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Palette className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {themes.map((t) => (
                            <DropdownMenuItem
                                key={t.value}
                                onClick={() => setTheme(t.value as any)}
                                className="flex items-center gap-3"
                            >
                                <div className={`h-4 w-4 rounded-full ${t.color} border-2 border-foreground/20`} />
                                <span>{t.label}</span>
                                {theme === t.value && <span className="ml-auto text-primary">✓</span>}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>

                </DropdownMenu> */}

                {/* Right: Navigation */}
                <motion.nav
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden sm:flex gap-6 items-center"
                >
                    <Link
                        href="/"
                        className="hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/courses"
                        className="hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                        Courses
                    </Link>
                    <Link
                        href="#about-developer-section"
                        className="hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                        About Developer
                    </Link>
                </motion.nav>
            </div>
        </header>
    );
}
