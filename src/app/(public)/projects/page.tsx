'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, Grid, List, ArrowUpRight, ExternalLink } from 'lucide-react';

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export default function ProjectsPage() {
  const { projects } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract all tags dynamically
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.techStack)))];

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || p.techStack.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-extrabold hero-gradient">Engineering Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Explore my system architectures, database systems, and agent frameworks.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/5 rounded-xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Tech tags filters */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedTag === tag 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          No projects found matching the criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div 
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              <Link href={`/projects/${project.slug}`} className="relative h-44 bg-slate-950 overflow-hidden block cursor-pointer">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070e] to-transparent"></div>
              </Link>

              <div className="p-6 flex flex-col gap-4 flex-grow">
                <Link href={`/projects/${project.slug}`} className="block hover:underline">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-slate-400 text-xs leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs font-semibold">
                  <Link href={`/projects/${project.slug}`} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5">
                    Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
