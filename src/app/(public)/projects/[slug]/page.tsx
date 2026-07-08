'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Play, 
  Server, 
  Database, 
  AlertCircle, 
  Compass, 
  Star, 
  Calendar, 
  Code, 
  Users, 
  CheckCircle, 
  Award, 
  Link as LinkIcon, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Plus
} from 'lucide-react';

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

// Map technology names to SVG logos
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  
  if (t.includes('react')) {
    return (
      <svg className="w-4 h-4 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.586c-.538 0-1.05.086-1.536.24a5.95 5.95 0 00-.776-.565c.71-.468 1.488-.727 2.312-.727.824 0 1.602.26 2.312.728-.216.216-.48.4-.776.564a4.015 4.015 0 00-1.536-.24zm0 2.828c.538 0 1.05-.086 1.536-.24.296.164.56.348.776.564-.71.468-1.488.727-2.312.727-.824 0-1.602-.26-2.312-.727.216-.216.48-.4.776-.564a4.015 4.015 0 001.536.24zm8.857-4.464c-.114-.52-.397-.992-.782-1.34a6.002 6.002 0 00-4.004-1.472 5.98 5.98 0 00-2.312.464 12.07 12.07 0 00-3.518-2.01 5.976 5.976 0 00-2.484-.528c-.824 0-1.602.164-2.312.464a6.003 6.003 0 00-4.004 5.48c0 1.1.296 2.13.782 3.03a5.987 5.987 0 001.536 2.01c.216.216.48.4.776.564.486.29 1.002.508 1.536.634a12.096 12.096 0 003.518 2.01c.71.3 1.488.464 2.312.464.824 0 1.602-.164 2.312-.464a12.09 12.09 0 003.518-2.01c.534-.126 1.05-.344 1.536-.634a5.977 5.977 0 002.312-2.574 5.98 5.98 0 00.782-3.03c0-.82-.16-1.6-.464-2.31z"/>
      </svg>
    );
  }
  if (t.includes('typescript') || t.includes('ts')) {
    return (
      <svg className="w-4 h-4 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.73 10.063c.96 0 1.78.293 2.458.877.678.583 1.082 1.39 1.21 2.42l-2.616.417c-.063-.538-.277-.962-.64-1.27-.365-.308-.85-.463-1.46-.463-.64 0-1.135.183-1.487.55-.353.364-.53.844-.53 1.44 0 .565.183.998.55 1.3.368.303.957.556 1.767.758.81.202 1.595.42 2.355.656.76.236 1.382.597 1.868 1.08.485.485.73 1.144.73 1.977 0 .99-.395 1.79-1.187 2.4-.793.612-1.895.918-3.307.918-1.076 0-1.996-.245-2.76-.733-.765-.487-1.258-1.183-1.48-2.086l2.5-.5c.105.518.398.922.878 1.214.48.29.98.437 1.5.437.665 0 1.183-.16 1.554-.48.37-.32.557-.735.557-1.246 0-.5-.183-.872-.55-1.115-.367-.243-.91-.462-1.63-.656-.722-.195-1.455-.395-2.2-.6-1.018-.28-1.782-.693-2.29-1.238-.51-.545-.764-1.27-.764-2.176 0-1 .36-1.79 1.083-2.373.722-.582 1.684-.873 2.885-.873zm-10.42.274h7.94v2.464h-2.686v8.423H9.12v-8.423H6.435V10.34z"/>
      </svg>
    );
  }
  if (t.includes('javascript') || t.includes('js')) {
    return (
      <svg className="w-4 h-4 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.165-.99-.81-1.734-2.28-2.23-1.47-.497-2.085-.794-2.085-1.385 0-.496.39-.795 1.02-.795.66 0 1.066.285 1.186.99h2.61c-.135-2.115-1.44-3.18-3.81-3.18-2.4 0-3.84 1.155-3.84 3.12 0 2.22 1.38 2.91 3.51 3.69 2.145.78 2.49 1.02 2.49 1.65 0 .615-.495.96-1.2.96-.855 0-1.395-.345-1.575-1.155h-2.655c.195 2.145 1.47 3.255 4.23 3.255 2.94 0 4.155-1.26 4.155-3.21zm-10.32-.274c-.165-.99-.81-1.734-2.28-2.23-1.47-.497-2.085-.794-2.085-1.385 0-.496.39-.795 1.02-.795.66 0 1.066.285 1.186.99h2.61c-.135-2.115-1.44-3.18-3.81-3.18-2.4 0-3.84 1.155-3.84 3.12 0 2.22 1.38 2.91 3.51 3.69 2.145.78 2.49 1.02 2.49 1.65 0 .615-.495.96-1.2.96-.855 0-1.395-.345-1.575-1.155H4.07c.195 2.145 1.47 3.255 4.23 3.255 2.94 0 4.155-1.26 4.155-3.21z"/>
      </svg>
    );
  }
  if (t.includes('python')) {
    return (
      <svg className="w-4 h-4 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18c.9 0 1.8.07 2.6.22 1.7.3 2.9 1.5 3.3 3.1.5 1.7.5 3.5 0 5.2-.3 1.1-.9 2-1.7 2.6-.9.7-2.1 1-3.3 1h-2.1v2.1c0 1.7-.6 3.3-1.7 4.5s-2.7 1.8-4.5 1.8H4.6c-1.7 0-3.3-.6-4.5-1.7S-.2 16.3-.2 14.5v-2.2c0-.9.07-1.8.22-2.6.3-1.7 1.5-2.9 3.1-3.3 1.7-.5 3.5-.5 5.2 0 1.1.3 2 .9 2.6 1.7.7.9 1 2.1 1 3.3v2.1h2.1c1.7 0 3.3.6 4.5 1.7s1.8 2.7 1.8 4.5v2.2c0 .9-.07 1.8-.22 2.6-.3 1.7-1.5 2.9-3.1 3.3-.8.2-1.7.2-2.6.2z"/>
      </svg>
    );
  }
  if (t.includes('django')) {
    return (
      <svg className="w-4 h-4 text-[#092E20]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.74 0c-.86 0-1.63.3-2.31.9-.68.61-1.02 1.48-1.02 2.63V7.2H1.93v2.66h2.48v9.95c0 1.25.39 2.22 1.16 2.9.78.69 1.77 1.04 2.98 1.04.53 0 1.06-.06 1.6-.17.53-.11.96-.28 1.29-.5l-.64-2.48c-.28.11-.6.2-.95.27-.36.07-.71.1-1.05.1-1.19 0-1.79-.69-1.79-2.07v-9.04h3.69V7.2H7.74V3.88c0-.66.19-1.12.58-1.39.39-.27.87-.4 1.46-.4h.98V0H7.74zm9.4 7.2c-.89 0-1.69.21-2.41.63-.72.42-1.28.98-1.68 1.68-.4.7-.6 1.49-.6 2.37s.2 1.67.6 2.37c.4.7.96 1.26 1.68 1.68.72.42 1.52.63 2.41.63s1.69-.21 2.41-.63c.72-.42 1.28-.98 1.68-1.68.4-.7.6-1.49.6-2.37s-.2-1.67-.6-2.37c-.4-.7-.96-1.26-1.68-1.68-.72-.42-1.52-.63-2.41-.63zm0 2.63c.76 0 1.27.34 1.52 1.02.25.68.37 1.47.37 2.37s-.12 1.69-.37 2.37c-.25.68-.76 1.02-1.52 1.02s-1.27-.34-1.52-1.02c-.25-.68-.37-1.47-.37-2.37s.12-1.69.37-2.37c.25-.68.76-1.02 1.52-1.02z"/>
      </svg>
    );
  }
  if (t.includes('postgres')) {
    return (
      <svg className="w-4 h-4 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1zm0-3c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v4z"/>
      </svg>
    );
  }
  if (t.includes('mongo')) {
    return (
      <svg className="w-4 h-4 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .024c-1.392.23-3.792 2.686-3.792 6.425 0 4.108 2.453 6.945 3.792 8.795 1.339-1.85 3.792-4.687 3.792-8.795 0-3.739-2.4-6.195-3.792-6.425zm0 15.65c-2.443-3.418-4.992-7.593-4.992-9.25C7.008 3.018 9.94.024 12 0c2.06.024 4.992 3.018 4.992 6.425 0 1.657-2.549 5.832-4.992 9.25zm.804 1.13c-.156.402-.455.776-.804 1.085-.349-.309-.648-.683-.804-1.085h1.608zm-.804 1.954c-.114.153-.25.32-.404.493V24l.404-.492.404.492v-4.75a2.531 2.531 0 01-.404-.493z"/>
      </svg>
    );
  }
  if (t.includes('redis')) {
    return (
      <svg className="w-4 h-4 text-[#DC382D]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 3.3l7.2 4.15-7.2 4.16-7.2-4.16L12 3.3zm-7.2 6.27l5.6 3.23v6.46l-5.6-3.23v-6.46zm8.8 9.69V12.8l5.6-3.23v6.46l-5.6 3.23z"/>
      </svg>
    );
  }
  if (t.includes('tailwind')) {
    return (
      <svg className="w-4 h-4 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    );
  }
  if (t.includes('node')) {
    return (
      <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-1.25 14.25H9.5V8.5h1.25v7.75zm3.75 0h-1.25v-4.5h-1.25v4.5H10.75v-7.75h1.25v2.25h1.25v-2.25H14.5v7.75z"/>
      </svg>
    );
  }
  if (t.includes('html')) {
    return (
      <svg className="w-4 h-4 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm10.5 4.125V8.25h4.636l-.216 2.437H12v4.125h4.227l-.427 4.813L12 20.688v-4.125h1.773l.216-2.437H12V4.125z"/>
      </svg>
    );
  }
  if (t.includes('css')) {
    return (
      <svg className="w-4 h-4 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm10.5 4.125V8.25h4.636l-.216 2.437H12v4.125h4.227l-.427 4.813L12 20.688v-4.125h1.773l.216-2.437H12V4.125z"/>
      </svg>
    );
  }
  if (t.includes('flask')) {
    return (
      <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    );
  }
  if (t.includes('pytorch')) {
    return (
      <svg className="w-4 h-4 text-[#EE4C2C]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.692 16.615c-.443-.886-.665-1.772-.665-2.658h1.33v.665c0 .443.222.886.665 1.33l-1.33.663zm6.65-2.658c0 .886-.222 1.772-.665 2.658l-1.33-.663c.443-.444.665-.887.665-1.33v-.665h1.33z"/>
      </svg>
    );
  }

  return <Code className="w-4 h-4 text-indigo-400" />;
};

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { projects, logAnalyticsEvent } = useApp();
  
  const project = projects.find(p => p.slug === slug);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    if (project) {
      logAnalyticsEvent('view_project', project.id);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">The case study you are looking for does not exist.</p>
        <Link href="/projects" className="inline-block mt-6 text-sm text-indigo-400 font-semibold hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Fallback highlights if database cache is not yet refreshed on user's side
  const getFallbackHighlights = (projectSlug: string) => {
    if (projectSlug === 'fairsplit') {
      return [
        { value: "95%", label: "Anomaly detection accuracy" },
        { value: "15+", label: "Anomaly types detected" },
        { value: "Multi-currency", label: "Auto conversion support" },
        { value: "1000+", label: "Expenses processed in testing" }
      ];
    }
    if (projectSlug === 'kissanmitra-ai-agriculture' || projectSlug === 'kissan-mithra') {
      return [
        { value: "94.6%", label: "Crop disease prediction accuracy" },
        { value: "8", label: "Regional Indian languages supported" },
        { value: "900+", label: "Multilingual farmer queries processed" },
        { value: "< 2s", label: "Average recommendation response time" }
      ];
    }
    if (projectSlug === 'chronos-wms-interpolation' || projectSlug === 'chronows') {
      return [
        { value: "92.4%", label: "Average SSIM score" },
        { value: "31.8 dB", label: "Average PSNR score" },
        { value: "100+", label: "Videos processed in testing" },
        { value: "Real-time", label: "Visualization & analytics dashboard" }
      ];
    }
    if (projectSlug === 'altuni-invest') {
      return [
        { value: "10", label: "Specialized financial AI agents active" },
        { value: "Real-time", label: "Workflow tracking terminal UI dashboard" },
        { value: "Automated", label: "PDF investment report compiler" },
        { value: "100%", label: "Type safety and schema validation" }
      ];
    }
    return [
      { value: "100%", label: "Type safety and schema validation score" },
      { value: "Responsive", label: "Glassmorphic admin editor console" }
    ];
  };

  const highlightsList = project.highlights && project.highlights.length > 0 
    ? project.highlights 
    : getFallbackHighlights(project.slug);

  // Gallery tabs list based on project type
  const galleryViews = project.slug === 'fairsplit'
    ? ['Dashboard', 'Add Expense', 'Import CSV', 'Anomaly Detection']
    : project.slug === 'altuni-invest'
    ? ['Terminal Home', 'Agent Crawler', 'Equity Reports', 'Risk Matrix']
    : (project.slug === 'chronos-wms-interpolation' || project.slug === 'chronows')
    ? ['Telemetry', 'Flow Output', 'Video queue', 'Task Manager']
    : (project.slug === 'kissanmitra-ai-agriculture' || project.slug === 'kissan-mithra')
    ? ['Farming Hub', 'Crop Predictor', 'Weather Alert', 'Market Board']
    : ['Dashboard View', 'Data Console', 'Settings Panel', 'System Analytics'];

  // Render dynamic dashboard app preview widget based on project slug matching the reference screenshot exactly
  const renderMiniDashboard = (projectSlug: string) => {
    const isFairSplit = projectSlug === 'fairsplit';
    const isAltuni = projectSlug === 'altuni-invest';
    const isChronos = projectSlug === 'chronos-wms-interpolation' || projectSlug === 'chronows';
    const isKissan = projectSlug === 'kissanmitra-ai-agriculture' || projectSlug === 'kissan-mithra';

    const sidebarItems = isFairSplit 
      ? ['Dashboard', 'Groups', 'Expenses', 'Settlements', 'Analytics', 'Import CSV', 'Settings']
      : isAltuni
      ? ['Terminal', 'Stock Alerts', 'Equity Reports', 'Agent Logs', 'Settings']
      : isChronos
      ? ['Telemetry', 'Frames Flow', 'Video Queue', 'SSIM Logs', 'Settings']
      : isKissan
      ? ['Query Center', 'Crop Expert', 'Weather Alert', 'Market Rates', 'Settings']
      : ['Control Panel', 'Database CRUD', 'Analytics', 'System Logs', 'Settings'];

    return (
      <div className="w-full h-full bg-[#0b0c16] flex text-left font-sans text-xs">
        
        {/* Mock App Sidebar */}
        <div className="w-[125px] border-r border-white/5 bg-[#090a12] p-3 flex flex-col gap-5 select-none shrink-0">
          <div className="flex items-center gap-2 px-1">
            <span className="w-4.5 h-4.5 rounded bg-indigo-600 flex items-center justify-center text-[10px] font-extrabold text-white">
              {projectSlug.substring(0, 1).toUpperCase()}
            </span>
            <span className="font-extrabold text-[10px] text-white tracking-tight capitalize truncate">
              {isFairSplit ? 'FairSplit' : isAltuni ? 'Altuni Invest' : isChronos ? 'Chronos' : isKissan ? 'KissanMitra' : 'Console'}
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            {sidebarItems.map((item, idx) => {
              const isActive = idx === 0;
              return (
                <div 
                  key={item} 
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[9px] font-semibold transition-all ${
                    isActive 
                      ? 'bg-white/5 text-white border-l-2 border-indigo-500' 
                      : 'text-slate-500 hover:text-slate-200 cursor-pointer'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mock App Content Body */}
        <div className="flex-grow p-4 bg-[#080912] overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div>
              <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                {isFairSplit ? 'Dashboard' : isAltuni ? 'Terminal Overview' : isChronos ? 'Telemetry Core' : 'Workspace'}
              </div>
              <div className="text-[9px] text-slate-500 font-medium">
                {isFairSplit ? 'Welcome back, Sourav 👨‍💻' : 'Session Status: Active'}
              </div>
            </div>
            <div className="w-5 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[9px] text-slate-400 font-bold">
              ⌨
            </div>
          </div>

          {isFairSplit && (
            <>
              <div className="grid grid-cols-4 gap-1.5 select-none">
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Total Balance</div>
                  <div className="font-extrabold text-[10px] text-cyan-400 mt-0.5">₹12,456.00</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Total Expenses</div>
                  <div className="font-extrabold text-[10px] text-indigo-400 mt-0.5">₹45,230.50</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">You are owed</div>
                  <div className="font-extrabold text-[10px] text-emerald-400 mt-0.5">₹5,230.00</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">You owe</div>
                  <div className="font-extrabold text-[10px] text-rose-400 mt-0.5">₹2,150.00</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow select-none">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Recent Expenses</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-white truncate font-medium">Trip to Manali</span>
                      </div>
                      <span className="text-indigo-400 font-bold shrink-0">₹4,200</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-white truncate font-medium">Dinner at Cafe</span>
                      </div>
                      <span className="text-indigo-400 font-bold shrink-0">₹1,250</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-white truncate font-medium">Movie Tickets</span>
                      </div>
                      <span className="text-indigo-400 font-bold shrink-0">₹850</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Your Groups</span>
                    <span className="text-[7px] text-indigo-400 font-extrabold cursor-pointer flex items-center gap-0.5 bg-indigo-955/20 px-1 rounded hover:underline">
                      <Plus className="w-2 h-2" /> New Group
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate font-medium">Manali Trip</span>
                      <span className="text-slate-500 text-[7px]">5 members</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate font-medium">College Friends</span>
                      <span className="text-slate-500 text-[7px]">8 members</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate font-medium">Roommates</span>
                      <span className="text-slate-500 text-[7px]">3 members</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isAltuni && (
            <>
              <div className="grid grid-cols-4 gap-1.5 select-none">
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Tickers</div>
                  <div className="font-extrabold text-[10px] text-cyan-400 mt-0.5">12 Active</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Sentiment</div>
                  <div className="font-extrabold text-[10px] text-indigo-400 mt-0.5">Bullish</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">PDF Reports</div>
                  <div className="font-extrabold text-[10px] text-emerald-400 mt-0.5">18 Done</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Risk Rating</div>
                  <div className="font-extrabold text-[10px] text-rose-400 mt-0.5">Stable</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow select-none">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Agent Activities</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">News Synthesizer</span>
                      <span className="text-emerald-400 text-[7px] font-bold">Crawling</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Risk Analyst</span>
                      <span className="text-slate-500 text-[7px]">Completed</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Market Alerts</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">AAPL Breakout</span>
                      <span className="text-emerald-400 font-bold">+2.4%</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">TSLA Volatility</span>
                      <span className="text-amber-400 font-bold">Alert</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isChronos && (
            <>
              <div className="grid grid-cols-4 gap-1.5 select-none">
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">GPU Load</div>
                  <div className="font-extrabold text-[10px] text-cyan-400 mt-0.5">78%</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Processed</div>
                  <div className="font-extrabold text-[10px] text-indigo-400 mt-0.5">104 Vids</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Target Rates</div>
                  <div className="font-extrabold text-[10px] text-emerald-400 mt-0.5">120 FPS</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Avg SSIM</div>
                  <div className="font-extrabold text-[10px] text-rose-400 mt-0.5">92.4%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow select-none">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Active Queue</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">cctv_dock_01.mp4</span>
                      <span className="text-emerald-400 text-[7px] font-bold">Done</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">warehouse_03.mp4</span>
                      <span className="text-indigo-400 text-[7px] font-bold">54%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Evaluation Specs</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Average PSNR</span>
                      <span className="text-cyan-400 font-bold">31.8 dB</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Flow Matrix</span>
                      <span className="text-slate-500">TV-L1</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isKissan && (
            <>
              <div className="grid grid-cols-4 gap-1.5 select-none">
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Accuracy</div>
                  <div className="font-extrabold text-[10px] text-cyan-400 mt-0.5">94.6%</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Farmer Queries</div>
                  <div className="font-extrabold text-[10px] text-indigo-400 mt-0.5">900+</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Languages</div>
                  <div className="font-extrabold text-[10px] text-emerald-400 mt-0.5">8 Dialects</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Resp Time</div>
                  <div className="font-extrabold text-[10px] text-rose-400 mt-0.5">&lt; 2s</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow select-none">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Crop Diagnostics</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Rice Leaf Blast</span>
                      <span className="text-emerald-400 text-[7px] font-bold">Solved</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Tomato Blight</span>
                      <span className="text-indigo-400 text-[7px] font-bold">Diagnosed</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Active Zones</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">Punjab Sector A</span>
                      <span className="text-emerald-400 font-bold">Active</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">UP Dist 04</span>
                      <span className="text-slate-500">Idle</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {!isFairSplit && !isAltuni && !isChronos && !isKissan && (
            <>
              <div className="grid grid-cols-4 gap-1.5 select-none">
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Build</div>
                  <div className="font-extrabold text-[10px] text-emerald-400 mt-0.5">Success</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Commits</div>
                  <div className="font-extrabold text-[10px] text-indigo-400 mt-0.5">142</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Test Pass</div>
                  <div className="font-extrabold text-[10px] text-purple-400 mt-0.5">100%</div>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded-lg border border-white/5 text-left">
                  <div className="text-[7px] text-slate-500 font-bold uppercase">Coverage</div>
                  <div className="font-extrabold text-[10px] text-cyan-400 mt-0.5">92%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow select-none">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Repo Commits</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate font-medium">refactored routes</span>
                      <span className="text-slate-500 text-[7px]">10m</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate font-medium">updated configs</span>
                      <span className="text-slate-500 text-[7px]">1h</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Console Logs</span>
                  <div className="flex flex-col gap-1">
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-indigo-400 font-mono truncate">next build</span>
                      <span className="text-emerald-400 text-[7px] font-bold">Ready</span>
                    </div>
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 flex items-center justify-between text-[8px]">
                      <span className="text-white truncate">TypeScript validation</span>
                      <span className="text-slate-500 text-[7px]">Success</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  // Render custom interactive app mockup screenshots inside browser mockup cards
  const renderGalleryMockup = (projectSlug: string, viewName: string) => {
    const isFairSplit = projectSlug === 'fairsplit';
    const isAltuni = projectSlug === 'altuni-invest';
    const isChronos = projectSlug === 'chronos-wms-interpolation' || projectSlug === 'chronows';
    const isKissan = projectSlug === 'kissanmitra-ai-agriculture' || projectSlug === 'kissan-mithra';

    if (isFairSplit) {
      if (viewName === 'Dashboard') {
        return (
          <div className="p-3 bg-[#0a0b16] h-full flex flex-col gap-2 text-[8px] text-slate-300 select-none">
            <div className="font-bold text-white text-[9px] border-b border-white/5 pb-1">FairSplit Home</div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <div className="bg-white/5 p-1 rounded border border-white/5">
                <div>Balance</div>
                <div className="font-bold text-emerald-400 text-[9px]">₹12,456</div>
              </div>
              <div className="bg-white/5 p-1 rounded border border-white/5">
                <div>You owe</div>
                <div className="font-bold text-rose-400 text-[9px]">₹2,150</div>
              </div>
            </div>
            <div className="bg-slate-900/60 p-1 rounded border border-white/5 flex items-center justify-between text-[7px] mt-1">
              <span>Trip to Manali</span>
              <span className="text-indigo-400 font-bold">₹4,200</span>
            </div>
          </div>
        );
      }
      if (viewName === 'Add Expense') {
        return (
          <div className="p-3 bg-[#0a0b16] h-full flex flex-col gap-2 text-[8px] text-slate-300 select-none">
            <div className="font-bold text-white text-[9px] border-b border-white/5 pb-1">Add Expense</div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="bg-slate-900 p-1.5 rounded border border-white/5 text-slate-500">Expense Title (e.g. Dinner)</div>
              <div className="bg-slate-900 p-1.5 rounded border border-white/5 text-slate-500">Amount (e.g. ₹1250)</div>
              <div className="bg-indigo-600 text-white font-bold p-1 rounded text-center mt-1 text-[7px]">Add to Group</div>
            </div>
          </div>
        );
      }
      if (viewName === 'Import CSV') {
        return (
          <div className="p-3 bg-[#0a0b16] h-full flex flex-col gap-2 text-[8px] text-slate-300 select-none items-center justify-center">
            <div className="w-full text-center border-b border-white/5 pb-1 mb-1 font-bold text-white text-[9px]">CSV Importer</div>
            <div className="border border-dashed border-white/10 rounded-xl p-3 w-full text-center bg-white/[0.01]">
              <div className="text-[7px] text-indigo-400">Drag & Drop file here</div>
              <div className="text-[5px] text-slate-500 mt-1">supports CSV, XLS up to 10MB</div>
            </div>
          </div>
        );
      }
      if (viewName === 'Anomaly Detection') {
        return (
          <div className="p-3 bg-[#0a0b16] h-full flex flex-col gap-2 text-[8px] text-slate-300 select-none">
            <div className="font-bold text-white text-[9px] border-b border-white/5 pb-1">AI Audit Alerts</div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="bg-rose-950/20 border border-rose-500/20 text-rose-300 p-1 rounded text-[7px] leading-tight">
                ⚠️ <b>Duplicate:</b> Cafe charge filed twice by Rahul & Sourav
              </div>
              <div className="bg-amber-950/20 border border-amber-500/20 text-amber-300 p-1 rounded text-[7px] leading-tight">
                ⚠️ <b>Outlier:</b> Flight booking exceeds average by 2.4x
              </div>
            </div>
          </div>
        );
      }
    }

    // Default template layouts for non-FairSplit apps
    return (
      <div className="p-3 bg-[#0a0b16] h-full flex flex-col gap-2 text-[8px] text-slate-300 select-none justify-center items-center">
        <span className="font-bold text-indigo-400 text-[10px]">{viewName}</span>
        <span className="text-slate-500 text-[7px]">Mock interface active</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* Header and top section grid styled exactly like your reference layout image */}
      <div className="flex flex-col gap-6">
        <Link href="/projects" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Info Text details mapping exactly */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-emerald-955/20 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-3 h-3 fill-emerald-400 text-emerald-400" /> Featured Project
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent leading-tight tracking-tight select-none">
                {project.id === 'p1' ? 'Chronos' : project.id === 'p2' ? 'KissanMitra' : project.title.split(' ')[0]}
              </h1>
              <p className="text-lg md:text-xl font-bold text-slate-200 mt-2">
                {project.id === 'p4' ? 'AI-Powered Group Expense Management Platform' : project.description}
              </p>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              {project.overview}
            </p>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold py-2 select-none">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-violet-400" />
                <span>{project.role || "Full Stack"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-violet-400" />
                <span>{project.teamSize || "Solo Project"}</span>
              </div>
            </div>

            {/* Action buttons row with custom styles and left-sided icons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.liveDemo || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] rounded-xl shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" /> Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-300 border border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:text-white rounded-xl transition-all shrink-0"
              >
                <GitHubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href={project.demoVideo || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-300 border border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:text-white rounded-xl transition-all shrink-0"
              >
                <Play className="w-3.5 h-3.5 text-slate-300 fill-transparent" /> Watch Demo
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Mockup Preview Widget matching layout exactly */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-[#0b0c16] shadow-2xl flex flex-col group/mockup">
            {/* Browser Header Bar */}
            <div className="bg-[#090a12] px-4 py-2.5 flex items-center justify-between border-b border-white/5 shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="text-[9px] text-slate-500 font-mono bg-[#05060b] px-3 py-0.5 rounded border border-white/5 max-w-[200px] truncate">
                localhost:3000/projects/{project.slug}
              </div>
              <div className="w-12"></div>
            </div>
            {/* Mockup Screen Body */}
            <div className="flex-grow overflow-hidden relative">
              <a 
                href={project.liveDemo || project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer hover:opacity-95 transition-opacity"
              >
                {renderMiniDashboard(project.slug)}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mockup:opacity-100 transition-opacity bg-black/40 duration-300 pointer-events-none">
                  <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs shadow-lg transform translate-y-2 group-hover/mockup:translate-y-0 transition-all duration-300">
                    Visit Live Project <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Technologies Used</h3>
        <div className="flex flex-wrap gap-2.5 p-4 rounded-xl border border-white/5 bg-white/5 flex-row">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-semibold flex items-center gap-2 shadow-sm hover:border-white/20 transition-all">
              {getTechIcon(tech)}
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Three-Column Overview Grid (Stretched to match bottoms nicely, with low padding gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Overview */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 bg-[#0a0b16]/40">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" /> Overview
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed flex-grow">{project.overview}</p>
        </div>

        {/* Column 2: Key Features */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 bg-[#0a0b16]/40">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-400" /> Key Features
          </h3>
          <ul className="flex flex-col gap-3 flex-grow">
            {project.features.map((feat, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Project Metadata Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-6 bg-[#0a0b16]/40">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">Project Metadata</h3>
          
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Project Type</span>
              <span className="text-xs text-white font-medium">Full Stack Web Application</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Role</span>
              <span className="text-xs text-white font-medium">{project.role || "Full Stack Developer"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Team Size</span>
              <span className="text-xs text-white font-medium">{project.teamSize || "Solo Project"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Timeline</span>
              <span className="text-xs text-white font-medium">{project.timeline}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Status</span>
              <span className="w-fit text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {project.status || "Completed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Technical Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: System Architecture */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" /> System Architecture
            </h2>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{project.architecture}</p>
          </div>

          {/* Visual flowchart diagram */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-955/40 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 text-center text-[10px] font-bold text-white">
              <div className="flex-1 p-3 rounded-xl border border-white/10 bg-slate-900 shadow-md">
                <span className="text-indigo-400 block">Frontend</span>
                <span className="text-[9px] text-slate-400 font-normal">React / Tailwind</span>
              </div>
              <div className="text-slate-500 text-sm font-light">➔</div>
              <div className="flex-1 p-3 rounded-xl border border-white/10 bg-slate-900 shadow-md">
                <span className="text-purple-400 block">Backend API</span>
                <span className="text-[9px] text-slate-400 font-normal">Express / Django</span>
              </div>
              <div className="text-slate-500 text-sm font-light">➔</div>
              <div className="flex-1 p-3 rounded-xl border border-white/10 bg-slate-900 shadow-md">
                <span className="text-emerald-400 block">Database</span>
                <span className="text-[9px] text-slate-400 font-normal">Mongo / Postgre</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-2">
              <div className="w-px h-6 border-l border-dashed border-white/20"></div>
            </div>
            
            <div className="flex justify-center gap-4 text-center text-[10px] font-bold text-white">
              <div className="p-3 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-950/10 shadow-sm flex flex-col gap-1 w-1/2">
                <span className="text-indigo-300">Background Worker</span>
                <span className="text-[9px] text-slate-400 font-normal">Celery / Redis / CSV Importer</span>
              </div>
            </div>

            {project.architectureImage && (
              <div className="rounded-xl overflow-hidden border border-white/5 aspect-video mt-4 bg-slate-900">
                <img src={project.architectureImage} alt="Architecture Map" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-purple-400" /> Database Design & Storage
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">{project.databaseDesign}</p>
          </div>
        </div>

        {/* Right Column: Highlights Stack (Auto-sized boxes, fallback indicators resolved) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" /> Highlights
          </h2>

          <div className="flex flex-col gap-4">
            {highlightsList.map((high, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-2 border-indigo-500 shadow-md bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="text-2xl font-extrabold text-white leading-none tracking-tight shrink-0">{high.value}</div>
                <div className="text-xs text-slate-300 font-medium leading-relaxed">{high.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Gallery Section */}
      <div className="flex flex-col gap-6 relative select-none">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Project Gallery
        </h2>

        {/* Gallery Slider Row Wrapper */}
        <div className="relative group border border-white/5 bg-[#080912]/80 p-6 rounded-3xl">
          <div 
            id="project-gallery-row"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none items-center scroll-smooth snap-x snap-mandatory"
          >
            {galleryViews.map((viewName) => (
              <div 
                key={viewName}
                className="snap-start shrink-0 w-[240px] flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Browser Card Mockup Container */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-[#090b16] flex flex-col shadow-md">
                  {/* Browser Header Bar */}
                  <div className="bg-[#0c0d1b] px-3 py-1.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <div className="text-[7px] text-slate-600 font-mono">
                      {viewName.toLowerCase().replace(/ /g, '_')}.exe
                    </div>
                    <div className="w-6"></div>
                  </div>
                  {/* Mock Browser Body Content */}
                  <div className="flex-grow overflow-hidden">
                    {renderGalleryMockup(project.slug, viewName)}
                  </div>
                </div>
                {/* Caption text underneath */}
                <div className="text-center text-xs font-semibold text-slate-300">
                  {viewName}
                </div>
              </div>
            ))}
          </div>

          {/* Flanking navigation chevron arrows on left & right edges overlay */}
          <button 
            onClick={() => {
              const el = document.getElementById('project-gallery-row');
              if (el) el.scrollLeft -= 260;
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121324] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('project-gallery-row');
              if (el) el.scrollLeft += 260;
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121324] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Three-Column Retrospective & Links Grid (Autosized columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Column 1: Challenges & Solutions */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 h-auto">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" /> Challenges & Solutions
          </h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl border border-red-500/10 bg-red-950/5 flex flex-col gap-1.5">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Engineering Complexities</span>
              <p className="text-slate-300 text-xs leading-relaxed">{project.challenges}</p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/5 flex flex-col gap-1.5">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Resolution</span>
              <p className="text-slate-300 text-xs leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>

        {/* Column 2: What I Learned */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 h-auto">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> What I Learned
          </h3>
          <ul className="flex flex-col gap-3">
            {project.whatILearned && project.whatILearned.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 h-auto">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-cyan-400" /> Useful Links
          </h3>
          <div className="flex flex-col gap-2">
            {project.liveDemo && (
              <a 
                href={project.liveDemo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-xs font-semibold text-slate-300 hover:text-white"
              >
                <span>Live Website</span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
            )}
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-xs font-semibold text-slate-300 hover:text-white"
            >
              <span>GitHub Repository</span>
              <GitHubIcon className="w-4 h-4 text-slate-500" />
            </a>
            {project.demoVideo && (
              <a 
                href={project.demoVideo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-xs font-semibold text-slate-300 hover:text-white"
              >
                <span>Project Demo Video</span>
                <Play className="w-4 h-4 text-slate-500" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Footer Banner CTA */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-indigo-950/20 via-slate-900/40 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="text-xl font-bold text-white">Like this project?</h4>
          <p className="text-sm text-slate-400 font-medium">Let&apos;s build something amazing together!</p>
        </div>
        <Link 
          href="/contact" 
          className="flex items-center gap-1.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          <MessageSquare className="w-4 h-4" /> Get in Touch
        </Link>
      </div>

    </div>
  );
}
