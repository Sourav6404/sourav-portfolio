'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useApp();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) return null; // Admin has its own sidebar/header

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-black text-sm shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          {settings.profileName ? settings.profileName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AM'}
        </div>
        <span className="font-semibold text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
          {settings.profileName}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <Link
          href="/contact"
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
        >
          Hire Me
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-slate-300 hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass border-b border-white/5 flex flex-col p-6 gap-4 lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold py-2 transition-colors ${
                  pathname === link.path ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/5">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
