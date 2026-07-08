'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Briefcase, BookOpen, GraduationCap, Heart, Compass, Cpu } from 'lucide-react';

export default function AboutPage() {
  const { settings, education, experiences } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-extrabold hero-gradient">About Me</h1>
        <p className="text-slate-400 text-sm mt-1">My background, philosophy, and professional journey.</p>
      </div>

      {/* Professional Summary */}
      <section className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
          <Briefcase className="w-5 h-5" /> Professional Summary
        </h2>
        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line flex flex-col gap-4">
          {settings.aboutSummary || (
            <>
              I am a systems-focused software engineer with a deep background in artificial intelligence integrations. 
              My professional focus centers on designing multi-agent loops, optimizing relational databases, and building robust, 
              animated frontends that render complex data flows into simple dashboards.
            </>
          )}
        </div>
      </section>

      {/* Career Objectives & Current Learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="glass-card p-6 rounded-2xl flex flex-col gap-3">
          <h3 className="text-base font-bold flex items-center gap-2 text-cyan-400">
            <Compass className="w-4 h-4" /> Career Objective
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed whitespace-pre-line">
            {settings.careerObjective || "To lead the architecture of distributed AI agent grids inside commercial enterprise environments, bridging modular, self-healing backend code bases with high-fidelity analytics frontends."}
          </p>
        </section>

        <section className="glass-card p-6 rounded-2xl flex flex-col gap-3">
          <h3 className="text-base font-bold flex items-center gap-2 text-purple-400">
            <Cpu className="w-4 h-4" /> Current Learning
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed whitespace-pre-line">
            {settings.currentLearning || "Deepening my expertise in custom LLM micro-tuning workflows, Rust-based WASM runtimes for high-speed edge compute, and advanced distributed graph states orchestration."}
          </p>
        </section>
      </div>

      {/* Work & Education Timelines */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
          <GraduationCap className="w-5 h-5" /> Education History
        </h2>
        <div className="flex flex-col gap-6 border-l border-white/5 pl-4 ml-2">
          {education.map((edu) => (
            <div key={edu.id} className="relative flex flex-col gap-2">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-semibold">{edu.institution}</p>
              <p className="text-xs text-slate-500 font-medium">CGPA: {edu.cgpa}</p>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {edu.courses.map(course => (
                  <span key={course} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 text-slate-400 bg-white/5">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interests and Languages */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-indigo-400">
            <Heart className="w-4 h-4" /> Personal Interests
          </h3>
          <ul className="text-xs text-slate-400 flex flex-col gap-2 leading-relaxed">
            {settings.personalInterests ? (
              settings.personalInterests.split(',').map((interest, idx) => (
                <li key={idx}>• {interest.trim()}</li>
              ))
            ) : (
              <>
                <li>• Contributing to open-source developer tooling and compilers</li>
                <li>• Science fiction literature (Asimov, Philip K. Dick)</li>
                <li>• Amateur astronomy and deep-space imaging</li>
                <li>• Long-distance trail running and bouldering</li>
              </>
            )}
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-4 h-4" /> Languages
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            {settings.languages ? (
              settings.languages.split(',').map((langInfo, idx) => {
                const match = langInfo.trim().match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
                const name = match ? match[1].trim() : langInfo.trim();
                const level = match && match[2] ? match[2].trim() : '';
                return (
                  <div key={idx}>
                    <p className="font-semibold text-white">{name}</p>
                    {level && <p className="text-[10px] text-slate-500">{level}</p>}
                  </div>
                );
              })
            ) : (
              <>
                <div>
                  <p className="font-semibold text-white">English</p>
                  <p className="text-[10px] text-slate-500">Native / Bilingual</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Spanish</p>
                  <p className="text-[10px] text-slate-500">Conversational</p>
                </div>
                <div>
                  <p className="font-semibold text-white">German</p>
                  <p className="text-[10px] text-slate-500">Basic</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
