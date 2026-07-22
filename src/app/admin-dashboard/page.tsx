'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import * as mock from '@/lib/mockData';
import { 
  Shield, LogOut, BarChart3, Layers, Award, 
  Briefcase, Mail, Settings as SettingsIcon, BookOpen, 
  Plus, Edit2, Trash2, Check, Star, Archive, Inbox, GraduationCap
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { 
    user, logout, projects, certificates, experiences, 
    blogPosts, messages, settings, updateSettings,
    saveProject, deleteProject, saveCertificate, deleteCertificate,
    saveExperience, deleteExperience, saveBlogPost, deleteBlogPost,
    saveMessage, deleteMessage,
    skills, education, saveSkill, deleteSkill, saveEducation, deleteEducation,
    events, uploadFile, syncLocalToSupabase
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'certificates' | 'experience' | 'skills' | 'education' | 'blogs' | 'messages' | 'settings'>('analytics');

  // Protection Guard
  React.useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  }, [user]);

  // Project Editor Form State
  const [editingProject, setEditingProject] = useState<mock.Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<mock.Project>>({});

  // Certificate Editor Form State
  const [editingCert, setEditingCert] = useState<mock.Certificate | null>(null);
  const [certForm, setCertForm] = useState<Partial<mock.Certificate>>({});

  // Experience Editor Form State
  const [editingExp, setEditingExp] = useState<mock.Experience | null>(null);
  const [expForm, setExpForm] = useState<Partial<mock.Experience>>({});

  // Skill Editor Form State
  const [editingSkill, setEditingSkill] = useState<mock.Skill | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<mock.Skill>>({});

  // Education Editor Form State
  const [editingEdu, setEditingEdu] = useState<mock.Education | null>(null);
  const [eduForm, setEduForm] = useState<Partial<mock.Education>>({});

  // Blog Editor Form State
  const [editingBlog, setEditingBlog] = useState<mock.BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<mock.BlogPost>>({});

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<mock.Settings>({ ...settings });

  // Sync settings when loaded
  React.useEffect(() => {
    if (settings) {
      setSettingsForm({ ...settings });
    }
  }, [settings]);

  if (!user) return null;

  // Handler CRUD triggers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const p: mock.Project = {
      id: projectForm.id || Math.random().toString(36).substring(7),
      title: projectForm.title || '',
      slug: projectForm.slug || '',
      description: projectForm.description || '',
      coverImage: projectForm.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      screenshots: typeof projectForm.screenshots === 'string' 
        ? (projectForm.screenshots as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (projectForm.screenshots || []),
      demoVideo: projectForm.demoVideo || '',
      architectureImage: projectForm.architectureImage || '',
      github: projectForm.github || '',
      liveDemo: projectForm.liveDemo || '',
      techStack: typeof projectForm.techStack === 'string' 
        ? (projectForm.techStack as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (projectForm.techStack || []),
      isFeatured: !!projectForm.isFeatured,
      overview: projectForm.overview || '',
      problem: projectForm.problem || '',
      solution: projectForm.solution || '',
      architecture: projectForm.architecture || '',
      databaseDesign: projectForm.databaseDesign || '',
      challenges: projectForm.challenges || '',
      features: typeof projectForm.features === 'string' 
        ? (projectForm.features as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (projectForm.features || []),
      futureImprovements: typeof projectForm.futureImprovements === 'string' 
        ? (projectForm.futureImprovements as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (projectForm.futureImprovements || []),
      timeline: projectForm.timeline || '2026',
      role: projectForm.role || '',
      teamSize: projectForm.teamSize || '',
      status: projectForm.status || '',
      highlights: typeof projectForm.highlights === 'string'
        ? (projectForm.highlights as string).split('\n').map(line => {
            const [val, ...lbl] = line.split(':');
            return { value: val?.trim() || '', label: lbl.join(':')?.trim() || '' };
          }).filter(h => h.value || h.label)
        : (projectForm.highlights || []),
      whatILearned: typeof projectForm.whatILearned === 'string'
        ? (projectForm.whatILearned as string).split(',').map(s => s.trim()).filter(Boolean)
        : (projectForm.whatILearned || []),
      created_at: projectForm.created_at || new Date().toISOString()
    };
    await saveProject(p);
    setEditingProject(null);
    setProjectForm({});
    alert("Project saved successfully!");
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const c: mock.Certificate = {
      id: certForm.id || Math.random().toString(36).substring(7),
      title: certForm.title || '',
      organization: certForm.organization || '',
      issueDate: certForm.issueDate || '',
      expiryDate: certForm.expiryDate || '',
      credentialId: certForm.credentialId || '',
      verificationUrl: certForm.verificationUrl || '',
      downloadUrl: certForm.downloadUrl || '',
      thumbnail: certForm.thumbnail || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300',
      skillsCovered: typeof certForm.skillsCovered === 'string' 
        ? (certForm.skillsCovered as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (certForm.skillsCovered || []),
      created_at: certForm.created_at || new Date().toISOString()
    };
    await saveCertificate(c);
    setEditingCert(null);
    setCertForm({});
    alert("Certificate saved successfully!");
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const ex: mock.Experience = {
      id: expForm.id || Math.random().toString(36).substring(7),
      company: expForm.company || '',
      position: expForm.position || '',
      startDate: expForm.startDate || '',
      endDate: expForm.endDate || 'Present',
      responsibilities: typeof expForm.responsibilities === 'string' 
        ? (expForm.responsibilities as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (expForm.responsibilities || []),
      achievements: typeof expForm.achievements === 'string' 
        ? (expForm.achievements as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (expForm.achievements || []),
      technologies: typeof expForm.technologies === 'string' 
        ? (expForm.technologies as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (expForm.technologies || []),
      companyWebsite: expForm.companyWebsite || ''
    };
    await saveExperience(ex);
    setEditingExp(null);
    setExpForm({});
    alert("Experience saved successfully!");
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const s: mock.Skill = {
      id: skillForm.id || Math.random().toString(36).substring(7),
      name: skillForm.name || '',
      category: (skillForm.category || 'Programming') as any,
      level: Number(skillForm.level) || 0,
      experienceYears: Number(skillForm.experienceYears) || 0,
      projectsUsedIn: typeof skillForm.projectsUsedIn === 'string' 
        ? (skillForm.projectsUsedIn as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (skillForm.projectsUsedIn || [])
    };
    await saveSkill(s);
    setEditingSkill(null);
    setSkillForm({});
    alert("Skill saved successfully!");
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    const ed: mock.Education = {
      id: eduForm.id || Math.random().toString(36).substring(7),
      institution: eduForm.institution || '',
      degree: eduForm.degree || '',
      startYear: eduForm.startYear || '',
      endYear: eduForm.endYear || '',
      cgpa: eduForm.cgpa || '',
      courses: typeof eduForm.courses === 'string' 
        ? (eduForm.courses as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (eduForm.courses || []),
      projects: typeof eduForm.projects === 'string' 
        ? (eduForm.projects as string).split(',').map(s => s.trim()).filter(Boolean) 
        : (eduForm.projects || [])
    };
    await saveEducation(ed);
    setEditingEdu(null);
    setEduForm({});
    alert("Education entry saved successfully!");
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const b: mock.BlogPost = {
      id: blogForm.id || Math.random().toString(36).substring(7),
      title: blogForm.title || '',
      slug: blogForm.slug || '',
      summary: blogForm.summary || '',
      content: blogForm.content || '',
      coverImage: blogForm.coverImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
      category: blogForm.category || 'Tech',
      tags: typeof blogForm.tags === 'string' ? (blogForm.tags as string).split(',').map(s => s.trim()) : (blogForm.tags || []),
      isDraft: !!blogForm.isDraft,
      views: blogForm.views || 0,
      publishedAt: blogForm.publishedAt || new Date().toISOString()
    };
    await saveBlogPost(b);
    setEditingBlog(null);
    setBlogForm({});
    alert("Blog post saved successfully!");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    alert("Website configurations updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#08070e] text-[#f4f4f7] flex flex-col md:flex-row">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-64 bg-[#0d0b1a] border-r border-white/5 p-6 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-white/5 pb-4">
            <Shield className="w-5 h-5" />
            <span>Admin Console</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'projects', name: 'Projects DB', icon: <Layers className="w-4 h-4" /> },
              { id: 'certificates', name: 'Certificates', icon: <Award className="w-4 h-4" /> },
              { id: 'experience', name: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'skills', name: 'Skills DB', icon: <Star className="w-4 h-4" /> },
              { id: 'education', name: 'Education DB', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'blogs', name: 'Blog CMS', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'messages', name: 'Inbox Messages', icon: <Mail className="w-4 h-4" /> },
              { id: 'settings', name: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingProject(null);
                  setEditingCert(null);
                  setEditingExp(null);
                  setEditingBlog(null);
                  setEditingSkill(null);
                  setEditingEdu(null);
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/20 px-3 py-2.5 rounded-lg border border-red-500/10 transition-all mt-8"
        >
          <LogOut className="w-4 h-4" />
          End Session
        </button>
      </aside>

      {/* Main Admin Panels */}
      <main className="flex-grow p-8 overflow-y-auto max-h-screen">
        
        {/* Tab 1: Analytics Charts */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-extrabold">Analytics & Insights</h1>
              <p className="text-slate-500 text-xs mt-0.5">Live dashboard metrics representing visits and operations downloads.</p>
            </div>

            {/* Calculate live metrics */}
            {(() => {
              const totalViews = events.filter(e => e.eventType === 'visit').length;
              const resumeDownloads = events.filter(e => e.eventType === 'download_resume').length;
              const unreadInquiries = messages.filter(m => !m.isRead).length;
              const draftArticles = blogPosts.filter(b => b.isDraft).length;

              // Calculate daily visit counts for the last 7 days
              const getTrafficData = () => {
                const data = [0, 0, 0, 0, 0, 0, 0];
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                
                events.forEach(event => {
                  if (event.eventType === 'visit' && event.created_at) {
                    const eventDate = new Date(event.created_at);
                    const diffTime = Math.abs(today.getTime() - eventDate.getTime());
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays >= 0 && diffDays < 7) {
                      data[6 - diffDays]++;
                    }
                  }
                });
                
                const maxVal = Math.max(...data, 1);
                return data.map(val => ({
                  val,
                  percentage: Math.max(Math.floor((val / maxVal) * 90), 8)
                }));
              };

              const trafficTrend = getTrafficData();

              return (
                <>
                  {/* Quick Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Total Views", value: totalViews, sub: "Live Pageviews" },
                      { label: "Resume Downloads", value: resumeDownloads, sub: "Live Downloads" },
                      { label: "Form Inquiries", value: messages.length, sub: `${unreadInquiries} unread` },
                      { label: "Active Articles", value: blogPosts.length, sub: `${draftArticles} Drafts` }
                    ].map((stat, idx) => (
                      <div key={idx} className="glass-card p-5 rounded-xl flex flex-col gap-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{stat.label}</span>
                        <span className="text-2xl font-black text-white">{stat.value}</span>
                        <span className="text-[9px] text-indigo-400 font-semibold">{stat.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Database Sync Utility */}
                  <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sync Local Data to Database</h3>
                      <p className="text-slate-400 text-xs max-w-xl">
                        Your website is connected to Supabase. If you have customized project details, uploaded certificates, or settings stored locally in this browser's LocalStorage, click below to migrate them to your Supabase tables.
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm("This will migrate all your local portfolio changes, certificates, and settings to Supabase. Continue?")) {
                          try {
                            await syncLocalToSupabase();
                            alert("Database synchronized successfully! All your local data is now saved to Supabase.");
                          } catch (err) {
                            console.error(err);
                            alert("Synchronization failed. Check browser console for errors.");
                          }
                        }
                      }}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
                    >
                      Push Local Data to Supabase
                    </button>
                  </div>

                  {/* Simple Visual Performance Charts */}
                  <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2">Weekly Traffic Trend (Live Views)</h3>
                    <div className="h-44 flex items-end gap-3 pt-6 px-4">
                      {trafficTrend.map((t, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div 
                            className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-cyan-400 min-h-[4px]"
                            style={{ height: `${t.percentage}%` }}
                          ></div>
                          <span className="text-[10px] text-slate-500">Day {i+1} ({t.val})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Tab 2: Projects DB CRUD */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Project Database</h1>
                <p className="text-slate-500 text-xs mt-0.5">Manage portfolio items, case-study contents, and cover tags.</p>
              </div>
              {!editingProject && (
                <button
                  onClick={() => {
                    setEditingProject({} as any);
                    setProjectForm({ techStack: [], features: [], futureImprovements: [], screenshots: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              )}
            </div>

            {editingProject ? (
              <form onSubmit={handleSaveProject} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{projectForm.id ? 'Edit Project' : 'New Project'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Title</label>
                    <input 
                      type="text" 
                      value={projectForm.title || ''} 
                      onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">URL Slug</label>
                    <input 
                      type="text" 
                      value={projectForm.slug || ''} 
                      onChange={e => setProjectForm({ ...projectForm, slug: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Short Description</label>
                  <input 
                    type="text" 
                    value={projectForm.description || ''} 
                    onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="glass-input p-2 text-xs" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={projectForm.coverImage || ''} 
                      onChange={e => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload File:</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const path = `projects/${Date.now()}_${file.name}`;
                            const url = await uploadFile('portfolio-media', path, file);
                            if (url) setProjectForm({ ...projectForm, coverImage: url });
                          }
                        }}
                        className="text-[9px] text-indigo-400 cursor-pointer" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Timeline (e.g., Jan 2026 - Present)</label>
                    <input 
                      type="text" 
                      value={projectForm.timeline || ''} 
                      onChange={e => setProjectForm({ ...projectForm, timeline: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">GitHub Link</label>
                    <input 
                      type="text" 
                      value={projectForm.github || ''} 
                      onChange={e => setProjectForm({ ...projectForm, github: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Live Demo Link</label>
                    <input 
                      type="text" 
                      value={projectForm.liveDemo || ''} 
                      onChange={e => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Demo Video URL (optional)</label>
                    <input 
                      type="text" 
                      value={projectForm.demoVideo || ''} 
                      onChange={e => setProjectForm({ ...projectForm, demoVideo: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload:</span>
                      <input 
                        type="file" 
                        accept="video/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const path = `projects/videos/${Date.now()}_${file.name}`;
                            const url = await uploadFile('portfolio-media', path, file);
                            if (url) setProjectForm({ ...projectForm, demoVideo: url });
                          }
                        }}
                        className="text-[9px] text-indigo-400 cursor-pointer" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Architecture Image URL (optional)</label>
                    <input 
                      type="text" 
                      value={projectForm.architectureImage || ''} 
                      onChange={e => setProjectForm({ ...projectForm, architectureImage: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload:</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const path = `projects/architecture/${Date.now()}_${file.name}`;
                            const url = await uploadFile('portfolio-media', path, file);
                            if (url) setProjectForm({ ...projectForm, architectureImage: url });
                          }
                        }}
                        className="text-[9px] text-indigo-400 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Screenshots (comma-separated URLs)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(projectForm.screenshots) ? projectForm.screenshots.join(', ') : (projectForm.screenshots || '')} 
                    onChange={e => setProjectForm({ ...projectForm, screenshots: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                    placeholder="url1, url2, url3"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Add Screenshot:</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const path = `projects/screenshots/${Date.now()}_${file.name}`;
                          const url = await uploadFile('portfolio-media', path, file);
                          if (url) {
                            const current = Array.isArray(projectForm.screenshots) ? projectForm.screenshots : [];
                            setProjectForm({ ...projectForm, screenshots: [...current, url] });
                          }
                        }
                      }}
                      className="text-[9px] text-indigo-400 cursor-pointer" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Tech Stack (comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(projectForm.techStack) ? projectForm.techStack.join(', ') : (projectForm.techStack || '')} 
                    onChange={e => setProjectForm({ ...projectForm, techStack: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                    placeholder="Next.js, Tailwind, TypeScript"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Overview / Purpose</label>
                  <textarea 
                    rows={3} 
                    value={projectForm.overview || ''} 
                    onChange={e => setProjectForm({ ...projectForm, overview: e.target.value })}
                    className="glass-input p-2 text-xs resize-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">The Problem / Challenge</label>
                    <textarea 
                      rows={3} 
                      value={projectForm.problem || ''} 
                      onChange={e => setProjectForm({ ...projectForm, problem: e.target.value })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">The Solution</label>
                    <textarea 
                      rows={3} 
                      value={projectForm.solution || ''} 
                      onChange={e => setProjectForm({ ...projectForm, solution: e.target.value })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Architecture Details</label>
                    <textarea 
                      rows={3} 
                      value={projectForm.architecture || ''} 
                      onChange={e => setProjectForm({ ...projectForm, architecture: e.target.value })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Database Design</label>
                    <textarea 
                      rows={3} 
                      value={projectForm.databaseDesign || ''} 
                      onChange={e => setProjectForm({ ...projectForm, databaseDesign: e.target.value })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Engineering Complexities & Resolutions</label>
                  <textarea 
                    rows={2} 
                    value={projectForm.challenges || ''} 
                    onChange={e => setProjectForm({ ...projectForm, challenges: e.target.value })}
                    className="glass-input p-2 text-xs resize-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Key Features (comma-separated)</label>
                    <input 
                      type="text" 
                      value={Array.isArray(projectForm.features) ? projectForm.features.join(', ') : (projectForm.features || '')} 
                      onChange={e => setProjectForm({ ...projectForm, features: e.target.value as any })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Future Improvements (comma-separated)</label>
                    <input 
                      type="text" 
                      value={Array.isArray(projectForm.futureImprovements) ? projectForm.futureImprovements.join(', ') : (projectForm.futureImprovements || '')} 
                      onChange={e => setProjectForm({ ...projectForm, futureImprovements: e.target.value as any })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Role (e.g. Full Stack Developer)</label>
                    <input 
                      type="text" 
                      value={projectForm.role || ''} 
                      onChange={e => setProjectForm({ ...projectForm, role: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Team Size (e.g. 4 Members)</label>
                    <input 
                      type="text" 
                      value={projectForm.teamSize || ''} 
                      onChange={e => setProjectForm({ ...projectForm, teamSize: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Status (e.g. Completed)</label>
                    <input 
                      type="text" 
                      value={projectForm.status || ''} 
                      onChange={e => setProjectForm({ ...projectForm, status: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">What I Learned (comma-separated list)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(projectForm.whatILearned) ? projectForm.whatILearned.join(', ') : (projectForm.whatILearned || '')} 
                    onChange={e => setProjectForm({ ...projectForm, whatILearned: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Highlights / Key Metrics (one per line, format: "Value: Description")</label>
                  <textarea 
                    rows={4} 
                    placeholder={`95%: Anomaly detection accuracy\n15+: Anomaly types detected`}
                    value={Array.isArray(projectForm.highlights) ? projectForm.highlights.map(h => `${h.value}: ${h.label}`).join('\n') : (projectForm.highlights || '')} 
                    onChange={e => setProjectForm({ ...projectForm, highlights: e.target.value as any })}
                    className="glass-input p-2 text-xs font-mono resize-none" 
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isFeatured"
                    checked={!!projectForm.isFeatured}
                    onChange={e => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  />
                  <label htmlFor="isFeatured" className="text-xs text-slate-300">Feature this project on landing page</label>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {projects.map(p => (
                  <div key={p.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setProjectForm({ 
                            ...p,
                            highlights: p.highlights ? p.highlights.map(h => `${h.value}: ${h.label}`).join('\n') : [] as any,
                            whatILearned: p.whatILearned ? p.whatILearned.join(', ') : '' as any
                          });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Confirm project deletion?")) {
                            await deleteProject(p.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Certificates CRUD */}
        {activeTab === 'certificates' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Manage Certificates</h1>
                <p className="text-slate-500 text-xs mt-0.5">Control educational proofs and online credentials verification links.</p>
              </div>
              {!editingCert && (
                <button
                  onClick={() => {
                    setEditingCert({} as any);
                    setCertForm({ skillsCovered: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> Add Certificate
                </button>
              )}
            </div>

            {editingCert ? (
              <form onSubmit={handleSaveCert} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{certForm.id ? 'Edit Certificate' : 'New Certificate'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Title</label>
                    <input 
                      type="text" 
                      value={certForm.title || ''} 
                      onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Provider Organization</label>
                    <input 
                      type="text" 
                      value={certForm.organization || ''} 
                      onChange={e => setCertForm({ ...certForm, organization: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Issue Date</label>
                    <input 
                      type="date" 
                      value={certForm.issueDate || ''} 
                      onChange={e => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Expiry Date (optional)</label>
                    <input 
                      type="date" 
                      value={certForm.expiryDate || ''} 
                      onChange={e => setCertForm({ ...certForm, expiryDate: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Credential ID</label>
                    <input 
                      type="text" 
                      value={certForm.credentialId || ''} 
                      onChange={e => setCertForm({ ...certForm, credentialId: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Verification URL</label>
                    <input 
                      type="text" 
                      value={certForm.verificationUrl || ''} 
                      onChange={e => setCertForm({ ...certForm, verificationUrl: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Thumbnail Image URL</label>
                    <input 
                      type="text" 
                      value={certForm.thumbnail || ''} 
                      onChange={e => setCertForm({ ...certForm, thumbnail: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload File:</span>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const path = `certificates/${Date.now()}_${file.name}`;
                            const url = await uploadFile('portfolio-media', path, file);
                            if (url) setCertForm({ ...certForm, thumbnail: url });
                          }
                        }}
                        className="text-[9px] text-indigo-400 cursor-pointer" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Download URL (PDF/Drive)</label>
                    <input 
                      type="text" 
                      value={certForm.downloadUrl || ''} 
                      onChange={e => setCertForm({ ...certForm, downloadUrl: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Skills Covered (comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(certForm.skillsCovered) ? certForm.skillsCovered.join(', ') : (certForm.skillsCovered || '')} 
                    onChange={e => setCertForm({ ...certForm, skillsCovered: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                  />
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingCert(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {certificates.map(c => (
                  <div key={c.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.title}</h4>
                      <p className="text-indigo-300 text-xs mt-0.5">{c.organization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCert(c);
                          setCertForm({ ...c });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete certificate entry?")) {
                            await deleteCertificate(c.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Experience CRUD */}
        {activeTab === 'experience' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Work Experience</h1>
                <p className="text-slate-500 text-xs mt-0.5">Edit timelines, positions, and company profiles.</p>
              </div>
              {!editingExp && (
                <button
                  onClick={() => {
                    setEditingExp({} as any);
                    setExpForm({ responsibilities: [], achievements: [], technologies: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> Add Entry
                </button>
              )}
            </div>

            {editingExp ? (
              <form onSubmit={handleSaveExp} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{expForm.id ? 'Edit Experience' : 'New Entry'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Company Name</label>
                    <input 
                      type="text" 
                      value={expForm.company || ''} 
                      onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Position / Role</label>
                    <input 
                      type="text" 
                      value={expForm.position || ''} 
                      onChange={e => setExpForm({ ...expForm, position: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Start Date</label>
                    <input 
                      type="text" 
                      value={expForm.startDate || ''} 
                      placeholder="YYYY-MM"
                      onChange={e => setExpForm({ ...expForm, startDate: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">End Date</label>
                    <input 
                      type="text" 
                      value={expForm.endDate || ''} 
                      placeholder="YYYY-MM or Present"
                      onChange={e => setExpForm({ ...expForm, endDate: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Company Website URL</label>
                    <input 
                      type="text" 
                      value={expForm.companyWebsite || ''} 
                      onChange={e => setExpForm({ ...expForm, companyWebsite: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Company Logo URL</label>
                    <input 
                      type="text" 
                      value={expForm.logo || ''} 
                      onChange={e => setExpForm({ ...expForm, logo: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload Logo:</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const path = `experiences/logos/${Date.now()}_${file.name}`;
                            const url = await uploadFile('portfolio-media', path, file);
                            if (url) setExpForm({ ...expForm, logo: url });
                          }
                        }}
                        className="text-[9px] text-indigo-400 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Responsibilities (comma separated)</label>
                  <textarea 
                    rows={3}
                    value={Array.isArray(expForm.responsibilities) ? expForm.responsibilities.join(', ') : (expForm.responsibilities || '')} 
                    onChange={e => setExpForm({ ...expForm, responsibilities: e.target.value as any })}
                    className="glass-input p-2 text-xs resize-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Key Achievements (comma separated)</label>
                    <textarea 
                      rows={2}
                      value={Array.isArray(expForm.achievements) ? expForm.achievements.join(', ') : (expForm.achievements || '')} 
                      onChange={e => setExpForm({ ...expForm, achievements: e.target.value as any })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Technologies (comma separated)</label>
                    <textarea 
                      rows={2}
                      value={Array.isArray(expForm.technologies) ? expForm.technologies.join(', ') : (expForm.technologies || '')} 
                      onChange={e => setExpForm({ ...expForm, technologies: e.target.value as any })}
                      className="glass-input p-2 text-xs resize-none" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingExp(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {experiences.map(e => (
                  <div key={e.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{e.position}</h4>
                      <p className="text-indigo-300 text-xs mt-0.5">{e.company} ({e.startDate} - {e.endDate})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingExp(e);
                          setExpForm({ ...e });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete this experience entry?")) {
                            await deleteExperience(e.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 8: Skills DB CRUD */}
        {activeTab === 'skills' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Technical Skills Database</h1>
                <p className="text-slate-500 text-xs mt-0.5">Manage frontend, backend, AI/ML, and soft skills.</p>
              </div>
              {!editingSkill && (
                <button
                  onClick={() => {
                    setEditingSkill({} as any);
                    setSkillForm({ category: 'Programming', level: 80, experienceYears: 2, projectsUsedIn: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              )}
            </div>

            {editingSkill ? (
              <form onSubmit={handleSaveSkill} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{skillForm.id ? 'Edit Skill' : 'New Skill'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Skill Name</label>
                    <input 
                      type="text" 
                      value={skillForm.name || ''} 
                      onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Category</label>
                    <select
                      value={skillForm.category || 'Programming'}
                      onChange={e => setSkillForm({ ...skillForm, category: e.target.value as any })}
                      className="glass-input p-2 text-xs"
                    >
                      <option value="Programming" className="bg-[#0d0b1a]">Programming</option>
                      <option value="Frontend" className="bg-[#0d0b1a]">Frontend</option>
                      <option value="Backend" className="bg-[#0d0b1a]">Backend</option>
                      <option value="AI & ML" className="bg-[#0d0b1a]">AI & ML</option>
                      <option value="Cloud & DB" className="bg-[#0d0b1a]">Cloud & DB</option>
                      <option value="DevOps" className="bg-[#0d0b1a]">DevOps</option>
                      <option value="Soft Skills" className="bg-[#0d0b1a]">Soft Skills</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Proficiency Level (0 - 100)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      value={skillForm.level ?? 80} 
                      onChange={e => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Years of Experience</label>
                    <input 
                      type="number" 
                      min="0"
                      value={skillForm.experienceYears ?? 2} 
                      onChange={e => setSkillForm({ ...skillForm, experienceYears: Number(e.target.value) })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Used in Projects (comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(skillForm.projectsUsedIn) ? skillForm.projectsUsedIn.join(', ') : (skillForm.projectsUsedIn || '')} 
                    onChange={e => setSkillForm({ ...skillForm, projectsUsedIn: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                    placeholder="OmniAgent, Altuni Invest"
                  />
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingSkill(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {skills.map(s => (
                  <div key={s.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{s.name}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{s.category} &bull; {s.experienceYears} Yrs &bull; {s.level}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSkill(s);
                          setSkillForm({ ...s });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete skill "${s.name}"?`)) {
                            await deleteSkill(s.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 9: Education DB CRUD */}
        {activeTab === 'education' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Education Database</h1>
                <p className="text-slate-500 text-xs mt-0.5">Manage academic degrees and course works.</p>
              </div>
              {!editingEdu && (
                <button
                  onClick={() => {
                    setEditingEdu({} as any);
                    setEduForm({ courses: [], projects: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> Add Academic Entry
                </button>
              )}
            </div>

            {editingEdu ? (
              <form onSubmit={handleSaveEdu} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{eduForm.id ? 'Edit Entry' : 'New Academic Entry'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Degree / Program</label>
                    <input 
                      type="text" 
                      value={eduForm.degree || ''} 
                      onChange={e => setEduForm({ ...eduForm, degree: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Institution</label>
                    <input 
                      type="text" 
                      value={eduForm.institution || ''} 
                      onChange={e => setEduForm({ ...eduForm, institution: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Start Year</label>
                    <input 
                      type="text" 
                      value={eduForm.startYear || ''} 
                      onChange={e => setEduForm({ ...eduForm, startYear: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">End Year</label>
                    <input 
                      type="text" 
                      value={eduForm.endYear || ''} 
                      onChange={e => setEduForm({ ...eduForm, endYear: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">CGPA / Grade (e.g. 3.9 / 4.0)</label>
                    <input 
                      type="text" 
                      value={eduForm.cgpa || ''} 
                      onChange={e => setEduForm({ ...eduForm, cgpa: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Core Courses (comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(eduForm.courses) ? eduForm.courses.join(', ') : (eduForm.courses || '')} 
                    onChange={e => setEduForm({ ...eduForm, courses: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                    placeholder="Machine Learning, Database Implementations"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Notable Projects (comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(eduForm.projects) ? eduForm.projects.join(', ') : (eduForm.projects || '')} 
                    onChange={e => setEduForm({ ...eduForm, projects: e.target.value as any })}
                    className="glass-input p-2 text-xs" 
                    placeholder="Decentralized edge computing node"
                  />
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingEdu(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {education.map(edu => (
                  <div key={edu.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{edu.institution} &bull; {edu.startYear} - {edu.endYear}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEdu(edu);
                          setEduForm({ ...edu });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete education entry for "${edu.degree}"?`)) {
                            await deleteEducation(edu.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Blog CMS CRUD */}
        {activeTab === 'blogs' && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold">Blog Article CMS</h1>
                <p className="text-slate-500 text-xs mt-0.5">Write technical journals using markdown text contents.</p>
              </div>
              {!editingBlog && (
                <button
                  onClick={() => {
                    setEditingBlog({} as any);
                    setBlogForm({ tags: [] });
                  }}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" /> New Article
                </button>
              )}
            </div>

            {editingBlog ? (
              <form onSubmit={handleSaveBlog} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{blogForm.id ? 'Edit Article' : 'New Article'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Title</label>
                    <input 
                      type="text" 
                      value={blogForm.title || ''} 
                      onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Slug</label>
                    <input 
                      type="text" 
                      value={blogForm.slug || ''} 
                      onChange={e => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="glass-input p-2 text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Summary</label>
                  <input 
                    type="text" 
                    value={blogForm.summary || ''} 
                    onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="glass-input p-2 text-xs" 
                    required 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={blogForm.coverImage || ''} 
                    onChange={e => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                    className="glass-input p-2 text-xs" 
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload Cover:</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const path = `blogs/${Date.now()}_${file.name}`;
                          const url = await uploadFile('portfolio-media', path, file);
                          if (url) setBlogForm({ ...blogForm, coverImage: url });
                        }
                      }}
                      className="text-[9px] text-indigo-400 cursor-pointer" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Markdown Content</label>
                  <textarea 
                    rows={8}
                    value={blogForm.content || ''} 
                    onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="glass-input p-3 text-xs resize-none font-mono" 
                    placeholder="# Heading 1&#10;Write markdown text..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Category</label>
                    <input 
                      type="text" 
                      value={blogForm.category || ''} 
                      onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={Array.isArray(blogForm.tags) ? blogForm.tags.join(', ') : (blogForm.tags || '')} 
                      onChange={e => setBlogForm({ ...blogForm, tags: e.target.value as any })}
                      className="glass-input p-2 text-xs" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isDraft"
                    checked={!!blogForm.isDraft}
                    onChange={e => setBlogForm({ ...blogForm, isDraft: e.target.checked })}
                  />
                  <label htmlFor="isDraft" className="text-xs text-slate-300">Keep as Draft</label>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
                    Publish Article
                  </button>
                  <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {blogPosts.map(b => (
                  <div key={b.id} className="glass-card p-5 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{b.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{b.category} {b.isDraft ? '(Draft)' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          setBlogForm({ ...b });
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete article permanently?")) {
                            await deleteBlogPost(b.id);
                          }
                        }}
                        className="p-2 rounded bg-red-950/20 border border-red-500/10 hover:bg-red-950/40 text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-extrabold">Inquiries Inbox</h1>
              <p className="text-slate-500 text-xs mt-0.5">Read and archive contact submissions submitted by visitors.</p>
            </div>

            <div className="flex flex-col gap-4">
              {messages.length === 0 ? (
                <div className="text-center py-24 text-slate-500">Inbox is empty.</div>
              ) : (
                messages.map((m) => (
                  <div 
                    key={m.id} 
                    className={`glass-card p-5 rounded-xl flex flex-col gap-3 relative ${
                      !m.isRead ? 'border-l-4 border-l-indigo-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{m.name}</h4>
                        <span className="text-[10px] text-slate-500">{m.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            const updated = { ...m, isImportant: !m.isImportant };
                            await saveMessage(updated);
                          }}
                          className={`p-2 rounded hover:bg-white/5 ${m.isImportant ? 'text-amber-400' : 'text-slate-500'}`}
                          aria-label="Mark Important"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={async () => {
                            await deleteMessage(m.id);
                          }}
                          className="p-2 rounded hover:bg-red-950/20 text-red-400"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">{m.subject}</div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#0b0a13] p-3 rounded-lg border border-white/5">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 7: Website Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-6">
            <div>
              <h1 className="text-xl font-extrabold text-white">General Configurations</h1>
              <p className="text-slate-500 text-xs mt-0.5">Control global profile attributes, email IDs, and social handles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Profile Name</label>
                <input
                  type="text"
                  value={settingsForm.profileName || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, profileName: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Profile Title</label>
                <input
                  type="text"
                  value={settingsForm.profileTitle || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, profileTitle: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Avatar Image URL</label>
                <input
                  type="text"
                  value={settingsForm.avatarUrl || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, avatarUrl: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload Avatar:</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const path = `profile/${Date.now()}_${file.name}`;
                        const url = await uploadFile('portfolio-media', path, file);
                        if (url) setSettingsForm({ ...settingsForm, avatarUrl: url });
                      }
                    }}
                    className="text-[9px] text-indigo-400 cursor-pointer" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Contact Email</label>
                <input
                  type="text"
                  value={settingsForm.email || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Phone Number</label>
                <input
                  type="text"
                  value={settingsForm.phone || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Location / Address</label>
                <input
                  type="text"
                  value={settingsForm.location || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">GitHub URL</label>
                <input
                  type="text"
                  value={settingsForm.githubUrl || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, githubUrl: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">LinkedIn URL</label>
                <input
                  type="text"
                  value={settingsForm.linkedinUrl || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, linkedinUrl: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Resume PDF Link</label>
                <input
                  type="text"
                  value={settingsForm.resumeUrl || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, resumeUrl: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-slate-500 font-semibold uppercase">Or Upload PDF:</span>
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const path = `resumes/${Date.now()}_${file.name}`;
                        const url = await uploadFile('portfolio-media', path, file);
                        if (url) setSettingsForm({ ...settingsForm, resumeUrl: url });
                      }
                    }}
                    className="text-[9px] text-indigo-400 cursor-pointer" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Availability Status</label>
                <select
                  value={settingsForm.availability}
                  onChange={e => setSettingsForm({ ...settingsForm, availability: e.target.value as any })}
                  className="glass-input p-3 text-xs"
                >
                  <option value="Available" className="bg-[#0d0b1a]">Available</option>
                  <option value="Busy" className="bg-[#0d0b1a]">Busy</option>
                  <option value="Open for Offers" className="bg-[#0d0b1a]">Open for Offers</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Typing Animation Labels (comma-separated)</label>
                <input
                  type="text"
                  value={settingsForm.typingStrings || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, typingStrings: e.target.value })}
                  className="glass-input p-3 text-xs"
                  placeholder="AI Systems Engineer, Full-Stack Architect"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Years of Experience Metric (e.g. 5+)</label>
                <input
                  type="text"
                  value={settingsForm.yearsExperience || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, yearsExperience: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Short Bio / Tagline</label>
                <textarea
                  rows={2}
                  value={settingsForm.bio || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                  className="glass-input p-3 text-xs resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Career Objective (About Page)</label>
                <textarea
                  rows={3}
                  value={settingsForm.careerObjective || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, careerObjective: e.target.value })}
                  className="glass-input p-3 text-xs resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Current Learning (About Page)</label>
                <textarea
                  rows={3}
                  value={settingsForm.currentLearning || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, currentLearning: e.target.value })}
                  className="glass-input p-3 text-xs resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Personal Interests (comma-separated)</label>
                <textarea
                  rows={3}
                  value={settingsForm.personalInterests || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, personalInterests: e.target.value })}
                  className="glass-input p-3 text-xs resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Languages (comma-separated)</label>
                <input
                  type="text"
                  value={settingsForm.languages || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, languages: e.target.value })}
                  className="glass-input p-3 text-xs"
                  placeholder="English (Bilingual), Spanish (Conversational)"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Professional Summary (About Page)</label>
                <textarea
                  rows={4}
                  value={settingsForm.aboutSummary || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, aboutSummary: e.target.value })}
                  className="glass-input p-3 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all mt-4 w-fit"
            >
              Update Configs
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
