-- Supabase Database Schema for Sourav Portfolio Next.js App
-- Copy and run this script in the Supabase SQL Editor to create all required tables.

-- 1. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    screenshots JSONB DEFAULT '[]'::jsonb,
    "demoVideo" TEXT,
    "architectureImage" TEXT,
    github TEXT NOT NULL,
    "liveDemo" TEXT,
    "techStack" JSONB DEFAULT '[]'::jsonb,
    "isFeatured" BOOLEAN DEFAULT FALSE,
    overview TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    architecture TEXT NOT NULL,
    "databaseDesign" TEXT NOT NULL,
    challenges TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    "futureImprovements" JSONB DEFAULT '[]'::jsonb,
    timeline TEXT NOT NULL,
    role TEXT,
    "teamSize" TEXT,
    status TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    "whatILearned" JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    "issueDate" TEXT NOT NULL,
    "expiryDate" TEXT,
    "credentialId" TEXT NOT NULL,
    "verificationUrl" TEXT NOT NULL,
    "downloadUrl" TEXT,
    thumbnail TEXT NOT NULL,
    "skillsCovered" JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    "companyWebsite" TEXT,
    logo TEXT,
    "certificateUrl" TEXT,
    "recommendationLetter" TEXT
);

-- 5. Trainings Table
CREATE TABLE IF NOT EXISTS trainings (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    duration TEXT NOT NULL,
    "skillsLearned" JSONB DEFAULT '[]'::jsonb,
    "certificateUrl" TEXT,
    "projectsBuilt" JSONB DEFAULT '[]'::jsonb
);

-- 6. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    "proofUrl" TEXT,
    "relatedProjects" JSONB DEFAULT '[]'::jsonb
);

-- 7. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level INTEGER NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "projectsUsedIn" JSONB DEFAULT '[]'::jsonb
);

-- 8. Education Table
CREATE TABLE IF NOT EXISTS education (
    id TEXT PRIMARY KEY,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    "startYear" TEXT NOT NULL,
    "endYear" TEXT NOT NULL,
    cgpa TEXT NOT NULL,
    courses JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb
);

-- 9. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    category TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    "isDraft" BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    "publishedAt" TIMESTAMPTZ NOT NULL
);

-- 10. Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    "isRead" BOOLEAN DEFAULT FALSE,
    "isImportant" BOOLEAN DEFAULT FALSE,
    "isArchived" BOOLEAN DEFAULT FALSE,
    "replyText" TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 11. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
    id TEXT PRIMARY KEY,
    "eventType" TEXT NOT NULL,
    "entityId" TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
