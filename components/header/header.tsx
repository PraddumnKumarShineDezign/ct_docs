'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
