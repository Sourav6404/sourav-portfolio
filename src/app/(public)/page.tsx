'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Download, Mail, 
  Layers, Award, Briefcase, Zap, Star
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import IntegrationsWidgets from '@/components/widgets/Integrations';

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export default function LandingPage() {
  const { settings, projects, certificates, experiences, achievements, logAnalyticsEvent } = useApp();
  
  // Typing Animation State
  const strings = settings.typingStrings 
    ? settings.typingStrings.split(',').map(s => s.trim()) 
    : ["AI Systems Engineer", "Full-Stack Architect", "LLM Orchestration Expert", "TypeScript Specialist"];
  const [currentText, setCurrentText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeString = strings[stringIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeString.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeString.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    }

    if (!isDeleting && charIndex === activeString.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setStringIndex(prev => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  const handleResumeDownload = () => {
    logAnalyticsEvent('download_resume');
    alert("Resume download triggered (tracked in Admin analytics).");
  };

  const featured = projects.filter(p => p.isFeatured).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
      {/* Hero Section */}
      <section className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-semibold w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {settings.availability}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <br />
            <span className="hero-gradient">{settings.profileName}</span>
          </h1>

          <div className="text-xl md:text-2xl font-medium text-slate-400 h-8 flex items-center">
            <span>Building&nbsp;</span>
            <span className="text-indigo-400 font-semibold typing-cursor pr-1">
              {currentText}
            </span>
          </div>

          <p className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
            {settings.bio}
          </p>

          {/* Social Icons & CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link 
              href="/projects" 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              onClick={handleResumeDownload}
              className="flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            <Link 
              href="/contact" 
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>

          {/* Core Handles */}
          <div className="flex items-center gap-4 mt-2">
            <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              <GitHubIcon className="w-4 h-4" /> GitHub
            </a>
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              <LinkedInIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Profile Image & Glow frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Custom background decoration */}
          <div className="absolute w-72 h-72 rounded-full bg-indigo-600/10 blur-[64px] -z-10"></div>
          <div className="absolute w-60 h-60 rounded-full bg-cyan-400/10 blur-[48px] -z-10 translate-x-12 translate-y-12"></div>
          
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl border border-white/10 overflow-hidden w-64 h-64 md:w-80 md:h-80 bg-slate-900 shadow-2xl">
              <img 
                src={settings.avatarUrl} 
                alt={settings.profileName} 
                className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Live Statistics Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <Layers className="text-indigo-400 w-5 h-5" />, value: projects.length, label: "Projects Built" },
          { icon: <Award className="text-cyan-400 w-5 h-5" />, value: certificates.length, label: "Certificates" },
          { icon: <Briefcase className="text-purple-400 w-5 h-5" />, value: settings.yearsExperience || "5+", label: "Years Experience" },
          { icon: <Zap className="text-amber-400 w-5 h-5" />, value: achievements.length, label: "Achievements & Hackathons" }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-2"
          >
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">{stat.icon}</div>
            <div className="text-3xl font-extrabold text-white mt-2">{stat.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Featured Projects Section */}
      <section className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-sm text-slate-400 mt-1">Handpicked systems engineered for scale and efficiency.</p>
          </div>
          <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 group">
            All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              <Link href={`/projects/${project.slug}`} className="relative h-48 w-full bg-slate-950 overflow-hidden block cursor-pointer">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070e] to-transparent"></div>
              </Link>
              
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div className="flex items-center justify-between">
                  <Link href={`/projects/${project.slug}`} className="block hover:underline">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex gap-1">
                    {project.isFeatured && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/5 text-xs font-semibold">
                  <Link href={`/projects/${project.slug}`} className="text-indigo-400 hover:text-indigo-300">
                    View Case Study
                  </Link>
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API Integrations */}
      <IntegrationsWidgets />

      {/* Teaser CTA */}
      <section className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden bg-gradient-to-r from-indigo-950/20 to-purple-950/20">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl -z-10"></div>
        <div className="flex flex-col gap-2 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold">Have a complex engineering challenge?</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Let's design highly-custom multi-agent frameworks, scalable APIs, and visual SaaS interfaces together.
          </p>
        </div>
        <Link 
          href="/contact" 
          className="flex items-center gap-2 bg-white hover:bg-slate-200 text-black px-6 py-3.5 rounded-xl font-semibold shadow-xl transition-all shrink-0"
        >
          Start a Conversation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
