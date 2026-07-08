'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Briefcase, Milestone, Link2, BookOpen, Award } from 'lucide-react';

export default function ExperiencePage() {
  const { experiences, trainings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Work History */}
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-extrabold hero-gradient">Professional Experience</h1>
          <p className="text-slate-400 text-sm mt-1">My senior-level contributions and engineering achievements in industry roles.</p>
        </div>

        <div className="flex flex-col gap-12 border-l border-white/5 pl-6 ml-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative flex flex-col gap-4">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#08070e] border-[3px] border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] flex items-center justify-center"></div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start flex-wrap gap-2 border-b border-white/5 pb-1">
                  <h2 className="text-lg font-bold text-white leading-tight hover:text-indigo-400 hover:underline transition-colors">
                    <Link href={`/experience/${exp.id}`}>{exp.position}</Link>
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 font-semibold uppercase tracking-wider">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-indigo-400 font-semibold">{exp.company}</span>
                  {exp.companyWebsite && (
                    <a
                      href={exp.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      aria-label="Website"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Core Responsibilities</h3>
                <ul className="flex flex-col gap-1 text-slate-300 text-xs leading-relaxed">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Achievements</h3>
                <ul className="flex flex-col gap-1 text-slate-300 text-xs leading-relaxed">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span className="font-medium">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.technologies.map(tech => (
                  <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainings, Bootcamps and Workshops */}
      <div className="flex flex-col gap-8 pt-8 border-t border-white/5">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" /> Bootcamps & Workshops
          </h2>
          <p className="text-slate-400 text-xs mt-1">Specialized learning bootcamps and intensive technical workshops completed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((trn) => (
            <div key={trn.id} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{trn.title}</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{trn.duration}</span>
                </div>
                <p className="text-xs text-indigo-300 font-semibold">{trn.provider}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Skills Acquired</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {trn.skillsLearned.map(skill => (
                    <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Projects Completed</span>
                <p className="text-xs text-slate-300 font-medium">{trn.projectsBuilt.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
