"use client";

import { useState } from "react";
import { Sparkles, Key, Check, ShieldCheck, HardDrive, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [cloudName, setCloudName] = useState("mediaforge-demo");
  const [apiKey, setApiKey] = useState("123456789012345");
  const [aiKey, setAiKey] = useState("••••••••••••••••");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
            Platform Configuration
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Settings & API Keys</h1>
        <p className="text-sm text-gray-400">
          Manage your Cloudinary account credentials, AI provider settings, and workspace preferences.
        </p>
      </div>

      {/* Cloudinary Credentials Form */}
      <form onSubmit={handleSave} className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Key className="w-4 h-4 text-purple-400" />
              <span>Cloudinary Account Credentials</span>
            </h3>
            <p className="text-xs text-gray-400">
              Required for signed asset uploads, generative AI transformations, and smart CDN delivery.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Connected</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Cloud Name</label>
            <input
              type="text"
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Google Gemini API Key (Multimodal AI)</label>
          <input
            type="password"
            value={aiKey}
            onChange={(e) => setAiKey(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Demo Mode Toggle Notice */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">Hackathon Demo Mode Active</span>
            <p className="text-[11px] text-gray-400">
              High-fidelity mock generations and pre-seeded high-res assets are enabled for 100% reliable judging.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-600 text-white font-bold">
            DEMO_MODE=true
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center space-x-1.5"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span>{saved ? "Settings Saved" : "Save Preferences"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
