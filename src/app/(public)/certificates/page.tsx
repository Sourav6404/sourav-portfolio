'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Award, Calendar, Link as LinkIcon, Download, ShieldCheck } from 'lucide-react';

export default function CertificatesPage() {
  const { certificates, logAnalyticsEvent } = useApp();

  const handleDownload = (certId: string) => {
    logAnalyticsEvent('download_certificate', certId);
    const cert = certificates.find(c => c.id === certId);
    if (cert && cert.downloadUrl && cert.downloadUrl !== '#') {
      window.open(cert.downloadUrl, '_blank');
    } else {
      alert("Certificate verification/download triggered.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-extrabold hero-gradient">Professional Credentials</h1>
        <p className="text-slate-400 text-sm mt-1">Verified certifications from cloud providers and deep learning academies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start animate-fade-in"
          >
            {/* Thumbnail Link */}
            <Link 
              href={`/certificates/${cert.id}`} 
              className="w-full md:w-36 h-28 bg-slate-900 border border-white/5 rounded-xl overflow-hidden shrink-0 block cursor-pointer group"
            >
              {!cert.thumbnail || cert.thumbnail.includes('images.unsplash.com') ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                  <Award className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1">Credential</span>
                </div>
              ) : (
                <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-300" />
              )}
            </Link>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Credential
                </div>
                <Link href={`/certificates/${cert.id}`} className="hover:underline block">
                  <h2 className="text-base font-bold text-white leading-tight mt-0.5">{cert.title}</h2>
                </Link>
                <p className="text-xs text-indigo-300 font-semibold">{cert.organization}</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Issued {cert.issueDate}</span>
                <span>ID: {cert.credentialId}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {cert.skillsCovered.map(skill => (
                  <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/5 flex-wrap">
                <Link
                  href={`/certificates/${cert.id}`}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View Details
                </Link>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Verify Online <LinkIcon className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleDownload(cert.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Download Proof <Download className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
