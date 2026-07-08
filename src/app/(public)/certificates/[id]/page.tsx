'use client';

import React, { use, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, ExternalLink, Calendar, Award, Download, ShieldCheck } from 'lucide-react';

interface CertificateDetailProps {
  params: Promise<{ id: string }>;
}

export default function CertificateDetailPage({ params }: CertificateDetailProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { certificates, logAnalyticsEvent } = useApp();

  const cert = certificates.find(c => c.id === id);

  useEffect(() => {
    if (cert) {
      logAnalyticsEvent('view_certificate', cert.id);
    }
  }, [cert]);

  if (!cert) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Certificate Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">The credential you are looking for does not exist or has been removed.</p>
        <Link href="/certificates" className="inline-block mt-6 text-sm text-indigo-400 font-semibold hover:underline">
          Back to Certificates
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    logAnalyticsEvent('download_certificate', cert.id);
    if (cert.downloadUrl && cert.downloadUrl !== '#') {
      window.open(cert.downloadUrl, '_blank');
    } else {
      alert("Certificate verification/download triggered.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <Link href="/certificates" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Certificates
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Verified Academic Credential
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mt-1">{cert.title}</h1>
            <p className="text-sm text-indigo-400 font-semibold">{cert.organization}</p>
          </div>
          <div className="flex items-center gap-3">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                Verify Online <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all"
            >
              Download Proof <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Certificate Display Screen */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 bg-slate-900 group">
            {!cert.thumbnail || cert.thumbnail.includes('images.unsplash.com') ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                <Award className="w-16 h-16 text-indigo-400" />
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Verified Credential</span>
              </div>
            ) : (
              <img 
                src={cert.thumbnail} 
                alt={cert.title} 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed text-center italic">
            Visual preview of credential validation. Click verify online to validate official record hashes.
          </p>
        </div>

        {/* Certificate Sidebar Info */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Credential Details</h3>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Credential ID</span>
              <span className="text-xs text-white font-mono break-all bg-white/5 px-2 py-1 rounded border border-white/5 mt-0.5">{cert.credentialId || 'N/A'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Date Issued</span>
              <span className="text-xs text-white font-medium flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                {cert.issueDate}
              </span>
            </div>

            {cert.expiryDate && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Expiration Date</span>
                <span className="text-xs text-white font-medium flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {cert.expiryDate}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Skills Covered / Verified</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {cert.skillsCovered.map(skill => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-300 font-medium">
                    {skill}
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
