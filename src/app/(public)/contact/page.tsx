'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const GitHubIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export default function ContactPage() {
  const { settings, saveMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoadingSubmit(true);
    try {
      const newMessage = {
        id: Math.random().toString(36).substring(7),
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'No Subject',
        message: formData.message,
        isRead: false,
        isImportant: false,
        isArchived: false,
        created_at: new Date().toISOString()
      };
      await saveMessage(newMessage);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert("Failed to send message, please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-4xl font-extrabold hero-gradient">Get In Touch</h1>
        <p className="text-slate-400 text-sm mt-1">Let's coordinate on system architectures, development consultations, or custom full-stack solutions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Info Card */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
            <h2 className="text-lg font-bold text-white">Contact Details</h2>

            <div className="flex items-center gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-indigo-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Email</span>
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white font-medium">{settings.email}</a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-cyan-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Phone</span>
                <span className="text-slate-300 font-medium">{settings.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-purple-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Location</span>
                <span className="text-slate-300 font-medium">{settings.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="glass-card p-6 rounded-2xl flex justify-around items-center">
            <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <GitHubIcon className="w-6 h-6" />
              <span className="text-[10px] font-semibold uppercase">GitHub</span>
            </a>
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <LinkedInIcon className="w-6 h-6" />
              <span className="text-[10px] font-semibold uppercase">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center gap-4 bg-emerald-950/10 border-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Message Transmitted!</h2>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Your message has been processed successfully. It has been routed to the private Admin Dashboard inbox for review.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white">Send a Message</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter name"
                    className="glass-input p-3 text-xs w-full"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    className="glass-input p-3 text-xs w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject of consultation"
                  className="glass-input p-3 text-xs w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project requirements..."
                  className="glass-input p-3 text-xs w-full resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white p-3 rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all mt-2"
              >
                <Send className="w-4 h-4" />
                {loadingSubmit ? 'Transmitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
