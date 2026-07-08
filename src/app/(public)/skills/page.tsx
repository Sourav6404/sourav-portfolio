'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Cpu, Terminal, Layout, Server, Database, Cloud, Star } from 'lucide-react';

export default function SkillsPage() {
  const { skills } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'AI & ML', 'Cloud & DB', 'DevOps', 'Soft Skills'];

  const filtered = skills.filter(skill => {
    if (activeCategory === 'All') return true;
    return skill.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Frontend': return <Layout className="w-4 h-4 text-indigo-400" />;
      case 'Backend': return <Server className="w-4 h-4 text-cyan-400" />;
      case 'AI & ML': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Cloud & DB': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Star className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-extrabold hero-gradient">Technical Skills</h1>
        <p className="text-slate-400 text-sm mt-1">Categorized expertise mapped to system architectures and development metrics.</p>
      </div>

      {/* Category Toggles */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {getCategoryIcon(cat)}
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{skill.name}</h3>
                <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">{skill.category}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
                {skill.experienceYears} Yrs Exp
              </span>
            </div>

            {/* Progress Slider representation */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded bg-slate-900 overflow-hidden border border-white/5 relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>

            {/* Project References */}
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Used in Projects</span>
              <p className="text-xs text-slate-300 font-medium">
                {skill.projectsUsedIn.length > 0 ? skill.projectsUsedIn.join(', ') : 'None / Personal Projects'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
