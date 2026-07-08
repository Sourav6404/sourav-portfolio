'use client';

import React, { use, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, ExternalLink, Calendar, Briefcase, Award, CheckCircle } from 'lucide-react';

interface ExperienceDetailProps {
  params: Promise<{ id: string }>;
}

export default function ExperienceDetailPage({ params }: ExperienceDetailProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { experiences, logAnalyticsEvent } = useApp();

  const exp = experiences.find(e => e.id === id);

  useEffect(() => {
    if (exp) {
      logAnalyticsEvent('view_experience', exp.id);
    }
  }, [exp]);

  if (!exp) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Experience Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">The experience record you are looking for does not exist or has been removed.</p>
        <Link href="/experience" className="inline-block mt-6 text-sm text-indigo-400 font-semibold hover:underline">
          Back to Experience
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12 text-[#f4f4f7] bg-[#08070e] min-h-screen">
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <Link href="/experience" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Experience
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> Professional Experience Record
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mt-1">{exp.position}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base text-cyan-400 font-bold">{exp.company}</span>
              {exp.companyWebsite && (
                <a
                  href={exp.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {exp.certificateUrl && (
              <a
                href={exp.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                View Certificate <Award className="w-4 h-4" />
              </a>
            )}
            {exp.companyWebsite && (
              <a
                href={exp.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all"
              >
                Visit Company <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Experience Details List */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Responsibilities */}
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 text-left">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Core Responsibilities
            </h2>
            <ul className="flex flex-col gap-3 text-slate-300 text-xs md:text-sm leading-relaxed">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 text-left">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                Key Achievements
              </h2>
              <ul className="flex flex-col gap-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span className="font-medium text-slate-200">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Sidebar Metadata Card */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-6 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Timeline & Info</h3>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Company</span>
              <span className="text-xs text-white font-semibold mt-0.5">{exp.company}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Role / Position</span>
              <span className="text-xs text-white font-semibold mt-0.5">{exp.position}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Duration</span>
              <span className="text-xs text-white font-medium flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                {exp.startDate} - {exp.endDate}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Technologies Utilized</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.technologies.map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-300 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
