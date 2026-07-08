'use client';

import React, { use, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Calendar, Eye, Clock, Share2 } from 'lucide-react';

interface BlogPostDetailProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetailPage({ params }: BlogPostDetailProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { blogPosts, logAnalyticsEvent } = useApp();

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      logAnalyticsEvent('view_blog', post.id);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">The article you are trying to view does not exist.</p>
        <Link href="/blog" className="inline-block mt-6 text-sm text-indigo-400 font-semibold hover:underline">
          Back to Journal
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Header Controls */}
      <div className="flex flex-col gap-4">
        <Link href="/blog" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 uppercase tracking-wider w-fit">
            {post.category}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Article
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-1 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium pb-6 border-b border-white/5">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.views} views</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/5">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content Rendered via Markdown */}
      <article className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base leading-relaxed flex flex-col gap-6">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h2 className="text-xl md:text-2xl font-bold text-white mt-6 mb-2 border-b border-white/5 pb-2">{children}</h2>,
            h2: ({ children }) => <h3 className="text-lg font-bold text-white mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4 text-slate-300">{children}</p>,
            pre: ({ children }) => <pre className="p-4 rounded-xl bg-slate-900 border border-white/5 overflow-x-auto text-xs text-slate-200 my-4">{children}</pre>,
            code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-xs text-cyan-400 font-mono">{children}</code>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-4 flex flex-col gap-1.5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 flex flex-col gap-1.5">{children}</ol>,
            a: ({ href, children }) => <a href={href} className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
