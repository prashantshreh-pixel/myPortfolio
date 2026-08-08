import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, HelpCircle, Github, Linkedin } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

export const BankaiFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioEngine.playSlash();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <footer id="bankai" className="relative pt-16 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 bg-[#050505] border-t border-zinc-900/80 overflow-hidden text-zinc-100">
      {/* Background Giant Outlined "BANKAI" Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-10">
        <h1 className="text-[20vw] sm:text-[26vw] font-black font-display text-stroke-strong uppercase tracking-tight leading-none text-center">
          BANKAI
        </h1>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
            <span>04 // CONTACT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white uppercase">
            CONTACT
          </h2>
          <div className="h-[2px] w-12 bg-red-600 my-3 sm:my-4" />
          <p className="text-xs sm:text-sm font-mono text-red-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold">
            FINAL FORM · DIRECT LINE · NO INTERMEDIARIES
          </p>
        </div>

        {/* Content Grid (Form Left, Social/Availability Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Form */}
          <div>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border border-red-600/50 bg-red-950/20 text-center space-y-4"
              >
                <div className="w-12 h-12 bg-red-600 text-white mx-auto flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(204,0,0,0.8)]">
                  <Check size={24} />
                </div>
                <h4 className="text-2xl font-black uppercase text-white font-display">
                  MISSION TRANSMITTED
                </h4>
                <p className="text-xs font-mono text-zinc-300">
                  Your message has been sent directly to the Shinigami Developer's soul queue.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2 bg-zinc-900 border border-white/20 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-widest"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* NAME */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your designation"
                    className="w-full bg-transparent border-0 border-b border-zinc-800 px-1 py-3 text-white placeholder-zinc-700 text-sm font-mono transition-all duration-300 focus:outline-none hover:border-red-600/60 focus:border-red-600 focus:border-b-2"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@domain.com"
                    className="w-full bg-transparent border-0 border-b border-zinc-800 px-1 py-3 text-white placeholder-zinc-700 text-sm font-mono transition-all duration-300 focus:outline-none hover:border-red-600/60 focus:border-red-600 focus:border-b-2"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="State your mission..."
                    className="w-full bg-transparent border-0 border-b border-zinc-800 px-1 py-3 text-white placeholder-zinc-700 text-sm font-mono transition-all duration-300 focus:outline-none hover:border-red-600/60 focus:border-red-600 focus:border-b-2 resize-none"
                  />
                </div>

                {/* Solid Red Full-Width Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => audioEngine.playSlash()}
                  className="w-full py-4 bg-[#cc0000] hover:bg-black text-white hover:text-red-500 border border-transparent hover:border-red-600 font-mono font-bold uppercase tracking-[0.25em] transition-all duration-300 text-xs sm:text-sm active:scale-[0.99]"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Social Channels & Availability */}
          <div className="space-y-10 lg:pl-8">
            <div>
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] font-bold mb-8">
                FIND ME IN THE SOUL SOCIETY
              </h3>

              <div className="space-y-6">
                {/* GITHUB WITH LOGO */}
                <div>
                  <div className="text-[11px] font-mono text-red-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Github size={14} className="text-red-500" />
                    <span>GITHUB</span>
                  </div>
                  <a
                    href="https://github.com/shinigami-dev"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => audioEngine.playHover()}
                    className="inline-flex items-center gap-2.5 font-mono text-sm text-zinc-200 hover:text-white transition-colors group"
                  >
                    <span className="text-red-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
                    <span>github.com/shinigami-dev</span>
                  </a>
                </div>

                {/* LINKEDIN WITH LOGO */}
                <div>
                  <div className="text-[11px] font-mono text-red-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Linkedin size={14} className="text-red-500" />
                    <span>LINKEDIN</span>
                  </div>
                  <a
                    href="https://linkedin.com/in/shinigami-dev"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => audioEngine.playHover()}
                    className="inline-flex items-center gap-2.5 font-mono text-sm text-zinc-200 hover:text-white transition-colors group"
                  >
                    <span className="text-red-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
                    <span>linkedin.com/in/shinigami-dev</span>
                  </a>
                </div>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="pt-4">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] font-bold mb-4">
                AVAILABILITY
              </h3>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)] animate-pulse" />
                <span className="font-mono text-sm text-zinc-200 font-medium">
                  Open to contract work — 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-500 tracking-wider uppercase gap-4">
          <p>© 2026 · SHINIGAMI DEVELOPER · ALL SPIRITUAL RIGHTS RESERVED</p>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="w-7 h-7 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            title="Help & System Info"
          >
            <HelpCircle size={14} />
          </button>
        </div>

        {/* Modal Info if Help clicked */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400"
          >
            <p>Soul Society Command Terminal v2.4 // Built with .NET 9, React, and Tailwind CSS.</p>
          </motion.div>
        )}
      </div>
    </footer>
  );
};

