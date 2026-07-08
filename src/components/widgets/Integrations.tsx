'use client';

import React from 'react';
import { Code2, Award, Star, GitFork, BookOpen, Trophy } from 'lucide-react';

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export default function IntegrationsWidgets() {
  // Hardcoded real-looking statistics for the widgets
  const gitHubData = {
    username: "alexmercer-dev",
    publicRepos: 48,
    followers: 1204,
    stars: 342,
    commitsThisYear: 1842,
    languages: [
      { name: "TypeScript", percent: 52 },
      { name: "Python", percent: 34 },
      { name: "Rust", percent: 8 },
      { name: "Go", percent: 6 }
    ]
  };

  const leetCodeData = {
    username: "alexmercer",
    solved: 532,
    total: 3100,
    categories: [
      { name: "Easy", count: 180, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      { name: "Medium", count: 280, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      { name: "Hard", count: 72, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" }
    ],
    contestRating: 1954,
    ranking: "Top 4.2%",
    badges: ["Knight", "50-Days Badge", "2025 Annual Badge"]
  };

  // Generate mock contribution heatmap matrix (7 rows x 25 columns)
  const heatmapRows = 7;
  const heatmapCols = 25;
  const generateIntensity = () => Math.floor(Math.random() * 4); // 0 = empty, 3 = high commits

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-6 md:px-12 py-8">
      
      {/* GitHub API widget */}
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-500/5 blur-2xl -z-10"></div>
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <GitHubIcon className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">GitHub API Tracker</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">@{gitHubData.username}</span>
        </div>

        {/* Repos, Stars, Followers Row */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase">Repositories</span>
            <span className="text-lg font-black text-white mt-1">{gitHubData.publicRepos}</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase">Stars Earned</span>
            <span className="text-lg font-black text-white mt-1 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {gitHubData.stars}
            </span>
          </div>
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase">Yearly Commits</span>
            <span className="text-lg font-black text-white mt-1 flex items-center justify-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-indigo-400" /> {gitHubData.commitsThisYear}
            </span>
          </div>
        </div>

        {/* Languages distribution */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Language Composition</span>
          <div className="w-full h-2 bg-slate-900 border border-white/5 rounded-full overflow-hidden flex">
            {gitHubData.languages.map((l, i) => {
              const bgColors = ["bg-indigo-500", "bg-yellow-500", "bg-red-500", "bg-sky-500"];
              return (
                <div 
                  key={i} 
                  className={`h-full ${bgColors[i % 4]}`}
                  style={{ width: `${l.percent}%` }}
                ></div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[10px] text-slate-400">
            {gitHubData.languages.map((l, i) => {
              const textColors = ["text-indigo-400", "text-yellow-400", "text-red-400", "text-sky-400"];
              return (
                <span key={i} className="flex items-center gap-1 font-semibold">
                  <span className={`w-1.5 h-1.5 rounded-full ${textColors[i % 4]} fill-current`}></span>
                  {l.name} ({l.percent}%)
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Heatmap Grid */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Contribution Pipeline</span>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {Array.from({ length: heatmapCols }).map((_, c) => (
              <div key={c} className="flex flex-col gap-1 shrink-0">
                {Array.from({ length: heatmapRows }).map((_, r) => {
                  const intensity = generateIntensity();
                  const bgShades = ["bg-white/5", "bg-emerald-950", "bg-emerald-700", "bg-emerald-400"];
                  return (
                    <div 
                      key={r} 
                      className={`w-2.5 h-2.5 rounded-sm border border-white/5 ${bgShades[intensity]}`}
                      title={`${intensity * 3} commits`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LeetCode widgets */}
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-500/5 blur-2xl -z-10"></div>
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">LeetCode Dashboard</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">@{leetCodeData.username}</span>
        </div>

        {/* Metrics Solved & Contest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[9px] text-slate-500 uppercase">Algorithm Problems</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {leetCodeData.solved} <span className="text-xs text-slate-500 font-medium">/ {leetCodeData.total}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              {leetCodeData.categories.map((c, i) => (
                <div key={i} className={`flex-1 p-2 border rounded-lg flex flex-col items-center ${c.color}`}>
                  <span className="text-[8px] uppercase tracking-wider font-semibold">{c.name}</span>
                  <span className="text-sm font-bold mt-0.5">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] text-slate-500 uppercase">Contest Rating</span>
                <div className="text-3xl font-extrabold text-white mt-1 flex items-center gap-1.5">
                  <Trophy className="w-6 h-6 text-amber-400 fill-amber-400/20" />
                  {leetCodeData.contestRating}
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                {leetCodeData.ranking}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
              <span className="text-[9px] text-slate-500 uppercase font-semibold">Earned Achievements</span>
              <div className="flex gap-2 flex-wrap">
                {leetCodeData.badges.map((badge, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 rounded border border-white/5 bg-slate-900 text-slate-300 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    {badge}
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
