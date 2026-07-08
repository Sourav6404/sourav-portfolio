'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Shield, Key, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, user } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Use password: admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#08070e] text-[#f4f4f7] flex items-center justify-center px-6">
      <div className="w-full max-w-md glass p-8 rounded-3xl flex flex-col gap-6 border border-white/5 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          <Shield className="w-8 h-8 text-black" />
        </div>

        <div className="text-center mt-6">
          <h1 className="text-xl font-extrabold">Admin Access Portal</h1>
          <p className="text-slate-500 text-xs mt-1">Authenticate to manage content databases and analytics pipelines.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-500 uppercase font-semibold">Admin Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="glass-input pl-10 pr-4 py-3 text-xs w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl text-xs font-semibold shadow-lg transition-all mt-2"
          >
            Authenticate
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-slate-600">
            For evaluation, use the password: <code className="text-cyan-400">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
