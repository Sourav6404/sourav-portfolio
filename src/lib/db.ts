import { createClient } from '@supabase/supabase-js';
import * as mock from './mockData';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase only if variables are supplied
export const isSupabaseConfigured = SUPABASE_URL && SUPABASE_ANON_KEY;
export const supabase = isSupabaseConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Helper to interact with LocalStorage
const getLocal = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(`portfolio_${key}`);
  if (!stored) {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
};

// Database Methods with transparent fallbacks
export const db = {
  // Settings
  async getSettings(): Promise<mock.Settings> {
    if (supabase) {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (!error && data) return data.value as mock.Settings;
    }
    return getLocal<mock.Settings>('settings', mock.INITIAL_SETTINGS);
  },
  async updateSettings(settings: mock.Settings): Promise<mock.Settings> {
    if (supabase) {
      await supabase.from('settings').upsert({ id: 'global', value: settings });
    }
    setLocal('settings', settings);
    return settings;
  },

  async getProjects(): Promise<mock.Project[]> {
    if (supabase) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    const projects = getLocal<mock.Project[]>('projects', mock.INITIAL_PROJECTS);
    
    // Auto-heal check: if local projects don't have highlights, merge them from INITIAL_PROJECTS
    let needsUpdate = false;
    const healed = projects.map(p => {
      const initP = mock.INITIAL_PROJECTS.find(ip => ip.slug === p.slug || ip.id === p.id);
      if (initP && (!p.highlights || p.highlights.length === 0 || !p.whatILearned || p.whatILearned.length === 0)) {
        needsUpdate = true;
        return {
          ...p,
          role: p.role || initP.role || '',
          teamSize: p.teamSize || initP.teamSize || '',
          status: p.status || initP.status || '',
          highlights: p.highlights && p.highlights.length > 0 ? p.highlights : (initP.highlights || []),
          whatILearned: p.whatILearned && p.whatILearned.length > 0 ? p.whatILearned : (initP.whatILearned || []),
        };
      }
      return p;
    });

    if (needsUpdate) {
      setLocal('projects', healed);
      return healed;
    }
    return projects;
  },
  async getProjectBySlug(slug: string): Promise<mock.Project | undefined> {
    const list = await this.getProjects();
    return list.find(p => p.slug === slug);
  },
  async saveProject(project: mock.Project): Promise<mock.Project> {
    const list = await this.getProjects();
    const index = list.findIndex(p => p.id === project.id);
    if (index >= 0) {
      list[index] = { ...project };
    } else {
      list.push(project);
    }
    if (supabase) {
      await supabase.from('projects').upsert(project);
    }
    setLocal('projects', list);
    return project;
  },
  async deleteProject(id: string): Promise<void> {
    const list = await this.getProjects();
    const filtered = list.filter(p => p.id !== id);
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
    setLocal('projects', filtered);
  },

  // Certificates
  async getCertificates(): Promise<mock.Certificate[]> {
    if (supabase) {
      const { data, error } = await supabase.from('certificates').select('*').order('issueDate', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<mock.Certificate[]>('certificates', mock.INITIAL_CERTIFICATES);
  },
  async saveCertificate(certificate: mock.Certificate): Promise<mock.Certificate> {
    const list = await this.getCertificates();
    const index = list.findIndex(c => c.id === certificate.id);
    if (index >= 0) {
      list[index] = certificate;
    } else {
      list.push(certificate);
    }
    if (supabase) {
      await supabase.from('certificates').upsert(certificate);
    }
    setLocal('certificates', list);
    return certificate;
  },
  async deleteCertificate(id: string): Promise<void> {
    const list = await this.getCertificates();
    const filtered = list.filter(c => c.id !== id);
    if (supabase) {
      await supabase.from('certificates').delete().eq('id', id);
    }
    setLocal('certificates', filtered);
  },

  // Experience
  async getExperiences(): Promise<mock.Experience[]> {
    if (supabase) {
      const { data, error } = await supabase.from('experiences').select('*').order('startDate', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<mock.Experience[]>('experiences', mock.INITIAL_EXPERIENCES);
  },
  async saveExperience(exp: mock.Experience): Promise<mock.Experience> {
    const list = await this.getExperiences();
    const index = list.findIndex(e => e.id === exp.id);
    if (index >= 0) {
      list[index] = exp;
    } else {
      list.push(exp);
    }
    if (supabase) {
      await supabase.from('experiences').upsert(exp);
    }
    setLocal('experiences', list);
    return exp;
  },
  async deleteExperience(id: string): Promise<void> {
    const list = await this.getExperiences();
    const filtered = list.filter(e => e.id !== id);
    if (supabase) {
      await supabase.from('experiences').delete().eq('id', id);
    }
    setLocal('experiences', filtered);
  },

  // Trainings
  async getTrainings(): Promise<mock.Training[]> {
    if (supabase) {
      const { data, error } = await supabase.from('trainings').select('*');
      if (!error && data) return data;
    }
    return getLocal<mock.Training[]>('trainings', mock.INITIAL_TRAININGS);
  },
  async saveTraining(training: mock.Training): Promise<mock.Training> {
    const list = await this.getTrainings();
    const index = list.findIndex(t => t.id === training.id);
    if (index >= 0) {
      list[index] = training;
    } else {
      list.push(training);
    }
    if (supabase) {
      await supabase.from('trainings').upsert(training);
    }
    setLocal('trainings', list);
    return training;
  },
  async deleteTraining(id: string): Promise<void> {
    const list = await this.getTrainings();
    const filtered = list.filter(t => t.id !== id);
    if (supabase) {
      await supabase.from('trainings').delete().eq('id', id);
    }
    setLocal('trainings', filtered);
  },

  // Achievements
  async getAchievements(): Promise<mock.Achievement[]> {
    if (supabase) {
      const { data, error } = await supabase.from('achievements').select('*');
      if (!error && data) return data;
    }
    return getLocal<mock.Achievement[]>('achievements', mock.INITIAL_ACHIEVEMENTS);
  },
  async saveAchievement(ach: mock.Achievement): Promise<mock.Achievement> {
    const list = await this.getAchievements();
    const index = list.findIndex(a => a.id === ach.id);
    if (index >= 0) {
      list[index] = ach;
    } else {
      list.push(ach);
    }
    if (supabase) {
      await supabase.from('achievements').upsert(ach);
    }
    setLocal('achievements', list);
    return ach;
  },
  async deleteAchievement(id: string): Promise<void> {
    const list = await this.getAchievements();
    const filtered = list.filter(a => a.id !== id);
    if (supabase) {
      await supabase.from('achievements').delete().eq('id', id);
    }
    setLocal('achievements', filtered);
  },

  // Skills
  async getSkills(): Promise<mock.Skill[]> {
    if (supabase) {
      const { data, error } = await supabase.from('skills').select('*');
      if (!error && data) return data;
    }
    return getLocal<mock.Skill[]>('skills', mock.INITIAL_SKILLS);
  },
  async saveSkill(skill: mock.Skill): Promise<mock.Skill> {
    const list = await this.getSkills();
    const index = list.findIndex(s => s.id === skill.id);
    if (index >= 0) {
      list[index] = skill;
    } else {
      list.push(skill);
    }
    if (supabase) {
      await supabase.from('skills').upsert(skill);
    }
    setLocal('skills', list);
    return skill;
  },
  async deleteSkill(id: string): Promise<void> {
    const list = await this.getSkills();
    const filtered = list.filter(s => s.id !== id);
    if (supabase) {
      await supabase.from('skills').delete().eq('id', id);
    }
    setLocal('skills', filtered);
  },

  // Education
  async getEducation(): Promise<mock.Education[]> {
    if (supabase) {
      const { data, error } = await supabase.from('education').select('*');
      if (!error && data) return data;
    }
    return getLocal<mock.Education[]>('education', mock.INITIAL_EDUCATION);
  },
  async saveEducation(edu: mock.Education): Promise<mock.Education> {
    const list = await this.getEducation();
    const index = list.findIndex(e => e.id === edu.id);
    if (index >= 0) {
      list[index] = edu;
    } else {
      list.push(edu);
    }
    if (supabase) {
      await supabase.from('education').upsert(edu);
    }
    setLocal('education', list);
    return edu;
  },
  async deleteEducation(id: string): Promise<void> {
    const list = await this.getEducation();
    const filtered = list.filter(e => e.id !== id);
    if (supabase) {
      await supabase.from('education').delete().eq('id', id);
    }
    setLocal('education', filtered);
  },

  // Blog Posts
  async getBlogPosts(): Promise<mock.BlogPost[]> {
    if (supabase) {
      const { data, error } = await supabase.from('blog_posts').select('*').order('publishedAt', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<mock.BlogPost[]>('blog_posts', mock.INITIAL_BLOG_POSTS);
  },
  async getBlogPostBySlug(slug: string): Promise<mock.BlogPost | undefined> {
    const list = await this.getBlogPosts();
    return list.find(b => b.slug === slug);
  },
  async saveBlogPost(post: mock.BlogPost): Promise<mock.BlogPost> {
    const list = await this.getBlogPosts();
    const index = list.findIndex(b => b.id === post.id);
    if (index >= 0) {
      list[index] = post;
    } else {
      list.push(post);
    }
    if (supabase) {
      await supabase.from('blog_posts').upsert(post);
    }
    setLocal('blog_posts', list);
    return post;
  },
  async deleteBlogPost(id: string): Promise<void> {
    const list = await this.getBlogPosts();
    const filtered = list.filter(b => b.id !== id);
    if (supabase) {
      await supabase.from('blog_posts').delete().eq('id', id);
    }
    setLocal('blog_posts', filtered);
  },

  // Messages (Inbox)
  async getMessages(): Promise<mock.Message[]> {
    if (supabase) {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<mock.Message[]>('messages', mock.INITIAL_MESSAGES);
  },
  async saveMessage(msg: mock.Message): Promise<mock.Message> {
    const list = await this.getMessages();
    const index = list.findIndex(m => m.id === msg.id);
    if (index >= 0) {
      list[index] = msg;
    } else {
      list.push(msg);
    }
    if (supabase) {
      await supabase.from('messages').upsert(msg);
    }
    setLocal('messages', list);
    return msg;
  },
  async deleteMessage(id: string): Promise<void> {
    const list = await this.getMessages();
    const filtered = list.filter(m => m.id !== id);
    if (supabase) {
      await supabase.from('messages').delete().eq('id', id);
    }
    setLocal('messages', filtered);
  },

  // Analytics Event Logs
  async logEvent(eventType: string, entityId?: string): Promise<void> {
    const event = {
      id: Math.random().toString(36).substring(7),
      eventType,
      entityId: entityId || null,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      await supabase.from('analytics_events').insert(event);
    }
    const events = getLocal<any[]>('analytics_events', []);
    events.push(event);
    setLocal('analytics_events', events);
  },
  async getEvents(): Promise<any[]> {
    return getLocal<any[]>('analytics_events', [
      { id: "ev1", eventType: "visit", created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: "ev2", eventType: "download_resume", created_at: new Date(Date.now() - 7200000).toISOString() },
      { id: "ev3", eventType: "view_project", entityId: "p1", created_at: new Date().toISOString() }
    ]);
  },
  async uploadFile(bucketName: string, path: string, file: File): Promise<string | null> {
    if (supabase) {
      const { data, error } = await supabase.storage.from(bucketName).upload(path, file, {
        upsert: true
      });
      if (error) {
        console.error("Supabase storage upload error:", error);
        return null;
      }
      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(path);
      return publicUrlData.publicUrl;
    }
    
    // Local fallback: convert to base64 data URL for local storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  },
  async syncLocalToSupabase(): Promise<void> {
    if (!supabase) return;
    
    // 1. Settings
    const localSettings = getLocal<mock.Settings>('settings', mock.INITIAL_SETTINGS);
    await supabase.from('settings').upsert({ id: 'global', value: localSettings });
    
    // 2. Projects
    const localProjects = getLocal<mock.Project[]>('projects', mock.INITIAL_PROJECTS);
    for (const p of localProjects) {
      await supabase.from('projects').upsert(p);
    }
    
    // 3. Certificates
    const localCerts = getLocal<mock.Certificate[]>('certificates', mock.INITIAL_CERTIFICATES);
    for (const c of localCerts) {
      await supabase.from('certificates').upsert(c);
    }
    
    // 4. Experiences
    const localExps = getLocal<mock.Experience[]>('experiences', mock.INITIAL_EXPERIENCES);
    for (const e of localExps) {
      await supabase.from('experiences').upsert(e);
    }
    
    // 5. Trainings
    const localTrainings = getLocal<mock.Training[]>('trainings', mock.INITIAL_TRAININGS);
    for (const t of localTrainings) {
      await supabase.from('trainings').upsert(t);
    }
    
    // 6. Achievements
    const localAchievements = getLocal<mock.Achievement[]>('achievements', mock.INITIAL_ACHIEVEMENTS);
    for (const a of localAchievements) {
      await supabase.from('achievements').upsert(a);
    }
    
    // 7. Skills
    const localSkills = getLocal<mock.Skill[]>('skills', mock.INITIAL_SKILLS);
    for (const s of localSkills) {
      await supabase.from('skills').upsert(s);
    }
    
    // 8. Education
    const localEdu = getLocal<mock.Education[]>('education', mock.INITIAL_EDUCATION);
    for (const ed of localEdu) {
      await supabase.from('education').upsert(ed);
    }
    
    // 9. Blog Posts
    const localBlogs = getLocal<mock.BlogPost[]>('blog_posts', mock.INITIAL_BLOG_POSTS);
    for (const b of localBlogs) {
      await supabase.from('blog_posts').upsert(b);
    }
  }
};
