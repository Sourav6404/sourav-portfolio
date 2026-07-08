'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, Calendar, Eye, Tag } from 'lucide-react';

export default function BlogPage() {
  const { blogPosts } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const published = blogPosts.filter(p => !p.isDraft);

  const categories = ['All', ...Array.from(new Set(published.map(p => p.category)))];

  const filtered = published.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-extrabold hero-gradient">Technical Journal</h1>
          <p className="text-slate-400 text-sm mt-1">Deep dives into AI engineering, backend performance, and TypeScript systems.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/5 rounded-xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          No articles found matching the criteria.
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:translate-y-0 hover:border-indigo-500/25"
            >
              {/* Cover */}
              <div className="w-full md:w-48 h-32 bg-slate-900 border border-white/5 rounded-xl overflow-hidden shrink-0">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>

              {/* Text info */}
              <div className="flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase">
                    <span className="text-indigo-400">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views} views</span>
                  </div>
                  <h2 className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-400 text-xs leading-relaxed">{post.summary}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 font-semibold uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
