'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/db';
import * as mock from '../lib/mockData';

interface AppContextType {
  settings: mock.Settings;
  projects: mock.Project[];
  certificates: mock.Certificate[];
  experiences: mock.Experience[];
  trainings: mock.Training[];
  achievements: mock.Achievement[];
  skills: mock.Skill[];
  education: mock.Education[];
  blogPosts: mock.BlogPost[];
  messages: mock.Message[];
  events: any[];
  loading: boolean;
  user: { email: string } | null;
  login: (password: string) => boolean;
  logout: () => void;
  refreshAll: () => Promise<void>;
  updateSettings: (s: mock.Settings) => Promise<void>;
  saveProject: (p: mock.Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveCertificate: (c: mock.Certificate) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  saveExperience: (e: mock.Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveTraining: (t: mock.Training) => Promise<void>;
  deleteTraining: (id: string) => Promise<void>;
  saveAchievement: (a: mock.Achievement) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  saveSkill: (s: mock.Skill) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  saveEducation: (e: mock.Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  saveBlogPost: (b: mock.BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  saveMessage: (m: mock.Message) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  logAnalyticsEvent: (type: string, id?: string) => Promise<void>;
  uploadFile: (bucket: string, path: string, file: File) => Promise<string | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<mock.Settings>(mock.INITIAL_SETTINGS);
  const [projects, setProjects] = useState<mock.Project[]>(mock.INITIAL_PROJECTS);
  const [certificates, setCertificates] = useState<mock.Certificate[]>(mock.INITIAL_CERTIFICATES);
  const [experiences, setExperiences] = useState<mock.Experience[]>(mock.INITIAL_EXPERIENCES);
  const [trainings, setTrainings] = useState<mock.Training[]>(mock.INITIAL_TRAININGS);
  const [achievements, setAchievements] = useState<mock.Achievement[]>(mock.INITIAL_ACHIEVEMENTS);
  const [skills, setSkills] = useState<mock.Skill[]>(mock.INITIAL_SKILLS);
  const [education, setEducation] = useState<mock.Education[]>(mock.INITIAL_EDUCATION);
  const [blogPosts, setBlogPosts] = useState<mock.BlogPost[]>(mock.INITIAL_BLOG_POSTS);
  const [messages, setMessages] = useState<mock.Message[]>(mock.INITIAL_MESSAGES);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check local session
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('portfolio_admin_logged');
      if (logged) setUser({ email: 'admin@portfolio.dev' });
    }
    refreshAll();
  }, []);

function cleanDriveUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    let fileId = '';
    const matchD = url.match(/\/file\/d\/([^/]+)/);
    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else {
      const matchId = url.match(/[?&]id=([^&]+)/);
      if (matchId && matchId[1]) {
        fileId = matchId[1];
      }
    }
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  return url;
}

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [
        s, prj, cert, exp, trn, ach, sk, edu, blg, msg, evs
      ] = await Promise.all([
        db.getSettings(),
        db.getProjects(),
        db.getCertificates(),
        db.getExperiences(),
        db.getTrainings(),
        db.getAchievements(),
        db.getSkills(),
        db.getEducation(),
        db.getBlogPosts(),
        db.getMessages(),
        db.getEvents()
      ]);

      const sanitizedSettings = {
        ...s,
        avatarUrl: cleanDriveUrl(s.avatarUrl),
        resumeUrl: cleanDriveUrl(s.resumeUrl),
      };

      const parseDateString = (dateStr: string | undefined): Date => {
        if (!dateStr) return new Date(0);
        const clean = dateStr.includes('-') ? dateStr.split('-')[1].trim() : dateStr.trim();
        if (clean.toLowerCase() === 'present') return new Date();
        const parsed = Date.parse(clean);
        if (!isNaN(parsed)) return new Date(parsed);
        const yearMatch = clean.match(/\b\d{4}\b/);
        if (yearMatch) {
          const year = parseInt(yearMatch[0]);
          const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
          let monthIdx = 0;
          const lower = clean.toLowerCase();
          for (let i = 0; i < months.length; i++) {
            if (lower.includes(months[i])) {
              monthIdx = i;
              break;
            }
          }
          return new Date(year, monthIdx, 1);
        }
        return new Date(0);
      };

      const sanitizedProjects = prj
        .map(p => ({
          ...p,
          coverImage: cleanDriveUrl(p.coverImage),
          architectureImage: p.architectureImage ? cleanDriveUrl(p.architectureImage) : '',
          screenshots: p.screenshots ? p.screenshots.map(url => cleanDriveUrl(url)) : [],
        }))
        .sort((a, b) => {
          const aFeat = !!a.isFeatured;
          const bFeat = !!b.isFeatured;
          if (aFeat && !bFeat) return -1;
          if (!aFeat && bFeat) return 1;
          const aDate = parseDateString(a.timeline);
          const bDate = parseDateString(b.timeline);
          return bDate.getTime() - aDate.getTime();
        });

      const sanitizedCertificates = cert
        .map(c => ({
          ...c,
          thumbnail: cleanDriveUrl(c.thumbnail),
        }))
        .sort((a, b) => {
          const aDate = parseDateString(a.issueDate);
          const bDate = parseDateString(b.issueDate);
          return bDate.getTime() - aDate.getTime();
        });

      const sanitizedExperiences = exp.map(e => ({
        ...e,
        logo: e.logo ? cleanDriveUrl(e.logo) : '',
      }));

      const sanitizedAchievements = ach.map(a => ({
        ...a,
        images: a.images ? a.images.map(img => cleanDriveUrl(img)) : [],
      }));

      const sanitizedBlogs = blg.map(b => ({
        ...b,
        coverImage: cleanDriveUrl(b.coverImage),
      }));

      setSettings(sanitizedSettings);
      setProjects(sanitizedProjects);
      setCertificates(sanitizedCertificates);
      setExperiences(sanitizedExperiences);
      setTrainings(trn);
      setAchievements(sanitizedAchievements);
      setSkills(sk);
      setEducation(edu);
      setBlogPosts(sanitizedBlogs);
      setMessages(msg);
      setEvents(evs);
    } catch (err) {
      console.error("Error refreshing portfolio data", err);
    } finally {
      setLoading(false);
    }
  };

  const login = (password: string) => {
    // Basic password authorization, or match supabase auth.
    // If password is 'admin123' or configured env
    if (password === 'admin123' || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      const u = { email: 'admin@portfolio.dev' };
      setUser(u);
      localStorage.setItem('portfolio_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portfolio_admin_logged');
  };

  // CRUD overrides that sync state
  const updateSettings = async (s: mock.Settings) => {
    const updated = await db.updateSettings(s);
    setSettings(updated);
  };

  const saveProject = async (p: mock.Project) => {
    await db.saveProject(p);
    await refreshAll();
  };

  const deleteProject = async (id: string) => {
    await db.deleteProject(id);
    await refreshAll();
  };

  const saveCertificate = async (c: mock.Certificate) => {
    await db.saveCertificate(c);
    await refreshAll();
  };

  const deleteCertificate = async (id: string) => {
    await db.deleteCertificate(id);
    await refreshAll();
  };

  const saveExperience = async (e: mock.Experience) => {
    await db.saveExperience(e);
    await refreshAll();
  };

  const deleteExperience = async (id: string) => {
    await db.deleteExperience(id);
    await refreshAll();
  };

  const saveTraining = async (t: mock.Training) => {
    await db.saveTraining(t);
    await refreshAll();
  };

  const deleteTraining = async (id: string) => {
    await db.deleteTraining(id);
    await refreshAll();
  };

  const saveAchievement = async (a: mock.Achievement) => {
    await db.saveAchievement(a);
    await refreshAll();
  };

  const deleteAchievement = async (id: string) => {
    await db.deleteAchievement(id);
    await refreshAll();
  };

  const saveSkill = async (s: mock.Skill) => {
    await db.saveSkill(s);
    await refreshAll();
  };

  const deleteSkill = async (id: string) => {
    await db.deleteSkill(id);
    await refreshAll();
  };

  const saveEducation = async (e: mock.Education) => {
    await db.saveEducation(e);
    await refreshAll();
  };

  const deleteEducation = async (id: string) => {
    await db.deleteEducation(id);
    await refreshAll();
  };

  const saveBlogPost = async (b: mock.BlogPost) => {
    await db.saveBlogPost(b);
    await refreshAll();
  };

  const deleteBlogPost = async (id: string) => {
    await db.deleteBlogPost(id);
    await refreshAll();
  };

  const saveMessage = async (m: mock.Message) => {
    await db.saveMessage(m);
    await refreshAll();
  };

  const deleteMessage = async (id: string) => {
    await db.deleteMessage(id);
    await refreshAll();
  };

  const logAnalyticsEvent = async (type: string, id?: string) => {
    await db.logEvent(type, id);
    const evs = await db.getEvents();
    setEvents(evs);
  };

  const uploadFile = async (bucket: string, path: string, file: File) => {
    return await db.uploadFile(bucket, path, file);
  };

  return (
    <AppContext.Provider value={{
      settings, projects, certificates, experiences, trainings, achievements, skills, education, blogPosts, messages, events, loading, user,
      login, logout, refreshAll, updateSettings, saveProject, deleteProject, saveCertificate, deleteCertificate, saveExperience, deleteExperience,
      saveTraining, deleteTraining, saveAchievement, deleteAchievement, saveSkill, deleteSkill, saveEducation, deleteEducation, saveBlogPost, deleteBlogPost,
      saveMessage, deleteMessage, logAnalyticsEvent, uploadFile
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
