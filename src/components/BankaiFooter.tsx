import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Check, AlertCircle, HelpCircle, Github, Linkedin, Mail, GraduationCap, FileDown, Loader2 } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

// EmailJS configuration — replace these with your actual keys
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

interface FormErrors {
  name?: string;
  email?: string;
}

export const BankaiFooter: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value.trim())) return 'Please enter a valid email address';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError(null);
    // Clear error on change if already touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all required fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);

    const newErrors: FormErrors = {};
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    setTouched({ name: true, email: true });

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      audioEngine.playHover();
      return;
    }

    audioEngine.playSlash();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim() || '(No message provided)',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error: any) {
      setIsSubmitting(false);
      setSubmitError(
        error?.text || 'Failed to send message. Please try emailing directly.'
      );
    }
  };

  const inputBaseClass =
    'w-full bg-transparent border-0 border-b px-1 py-2.5 text-white placeholder-zinc-700 text-sm font-mono transition-all duration-300 focus:outline-none';

  const getInputClass = (field: string) => {
    const hasError = touched[field] && errors[field as keyof FormErrors];
    return `${inputBaseClass} ${hasError
        ? 'border-red-500 focus:border-red-400 focus:border-b-2'
        : 'border-zinc-800 hover:border-red-600/60 focus:border-red-600 focus:border-b-2'
      }`;
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
            <span>04 // CONTACT & CREDENTIALS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white uppercase">
            CONTACT
          </h2>
          <div className="h-[2px] w-12 bg-red-600 my-3 sm:my-4" />
          <p className="text-xs sm:text-sm font-mono text-red-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold">
            PRASHANT SHRESTHA · DIRECT LINE · KATHMANDU, NEPAL
          </p>
        </div>

        {/* Content Grid (Form Left, Social/Credentials Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Form */}
          <div className="flex flex-col justify-between">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border border-red-600/50 bg-red-950/20 text-center space-y-4"
              >
                <div className="w-12 h-12 bg-green-600 text-white mx-auto flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(22,163,74,0.8)]">
                  <Check size={24} />
                </div>
                <h4 className="text-2xl font-black uppercase text-white font-display">
                  TRANSMISSION RECEIVED
                </h4>
                <p className="text-xs font-mono text-zinc-300">
                  Your message has been delivered directly to Prashant Shrestha's inbox.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                    setErrors({});
                    setTouched({});
                    setSubmitError(null);
                  }}
                  className="mt-4 px-6 py-2 bg-zinc-900 border border-white/20 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-widest"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* NAME — Required */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    NAME / DESIGNATION
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Your name or company"
                    className={getInputClass('name')}
                    autoComplete="name"
                  />
                  {touched.name && errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-[11px] font-mono text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={12} /> {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* EMAIL — Required */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    EMAIL
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your@domain.com"
                    className={getInputClass('email')}
                    autoComplete="email"
                  />
                  {touched.email && errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-[11px] font-mono text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={12} /> {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
                    MESSAGE / PROJECT INQUIRY
                    <span className="text-red-500 text-[14px] ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="State your technical mission or opportunity..."
                    className="w-full bg-transparent border-0 border-b border-zinc-800 px-1 py-2.5 text-white placeholder-zinc-700 text-sm font-mono transition-all duration-300 focus:outline-none hover:border-red-600/60 focus:border-red-600 focus:border-b-2 resize-none"
                  />
                </div>

                {/* Submission Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/30 border border-red-600/40 text-xs font-mono text-red-400 flex items-start gap-2"
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </motion.div>
                )}

                {/* Solid Red Full-Width Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#cc0000] hover:bg-white text-white hover:text-black border border-transparent font-mono font-bold uppercase tracking-[0.25em] transition-all duration-300 text-xs sm:text-sm active:scale-[0.99] shadow-[0_0_20px_rgba(204,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    'INITIATE CONTACT'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Executive Credentials */}
          <div className="flex flex-col justify-between space-y-3.5 font-mono relative">

            <div className="relative z-10">
              <h3 className="text-xs text-zinc-500 uppercase tracking-[0.25em] font-bold mb-3">
                DIRECT CHANNELS & RESUME
              </h3>

              <div className="space-y-3">
                {/* DIRECT RESUME PDF DOWNLOAD */}
                <a
                  href="./Prashant Shrestha - Executive Resume 2026.pdf"
                  download="Prashant_Shrestha_Resume_2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => audioEngine.playSlash()}
                  className="flex items-center justify-between p-3.5 bg-zinc-950/80 border border-red-600/60 hover:border-red-500 group transition-all backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <FileDown size={17} className="text-red-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs uppercase font-bold text-white tracking-wider">OFFICIAL RESUME 2026 (PDF)</div>
                      <div className="text-[10px] text-zinc-400">Prashant Shrestha - Executive Resume</div>
                    </div>
                  </div>
                  <span className="text-xs text-red-500 group-hover:text-white font-bold">DOWNLOAD →</span>
                </a>

                {/* EMAIL */}
                <div className="p-3 glass-panel border border-white/10 flex items-center justify-between backdrop-blur-md bg-black/60">
                  <div className="flex items-center gap-2.5">
                    <Mail size={13} className="text-red-500" />
                    <span className="text-xs text-zinc-200">prashantmessi08@gmail.com</span>
                  </div>
                  <a
                    href="mailto:prashantmessi08@gmail.com"
                    onClick={() => audioEngine.playHover()}
                    className="text-[10px] text-red-500 hover:text-white font-bold uppercase tracking-wider"
                  >
                    SEND EMAIL →
                  </a>
                </div>

                {/* GITHUB & LINKEDIN */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/prashantshreh-pixel"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => audioEngine.playHover()}
                    className="p-3 glass-panel border border-white/10 hover:border-red-600/60 transition-all flex items-center justify-between group backdrop-blur-md bg-black/60"
                  >
                    <div className="flex items-center gap-2">
                      <Github size={14} className="text-red-500" />
                      <span className="text-xs text-zinc-300 group-hover:text-white font-bold">GITHUB</span>
                    </div>
                    <span className="text-red-500 text-xs font-bold">→</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/prashant-shrestha-dev"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => audioEngine.playHover()}
                    className="p-3 glass-panel border border-white/10 hover:border-red-600/60 transition-all flex items-center justify-between group backdrop-blur-md bg-black/60"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin size={14} className="text-red-500" />
                      <span className="text-xs text-zinc-300 group-hover:text-white font-bold">LINKEDIN</span>
                    </div>
                    <span className="text-red-500 text-xs font-bold">→</span>
                  </a>
                </div>

                {/* EDUCATION & ACADEMIC CREDENTIALS */}
                <div className="relative overflow-hidden p-3 bg-zinc-950/80 border border-white/10 hover:border-red-600/50 transition-all group flex items-center justify-between shadow-md backdrop-blur-md">
                  {/* College Logo sitting in the middle: grayscale by default, full vibrant color on hover */}
                  <img
                    src="/assets/Herald colz.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-auto object-contain grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  />

                  <div className="flex items-center gap-2.5 relative z-10">
                    <GraduationCap size={15} className="text-red-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-white uppercase group-hover:text-red-400 transition-colors">B.Sc. Computer Science</div>
                      <div className="text-[10px] text-zinc-400">Herald College · Wolverhampton</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono relative z-10">2018–2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-500 tracking-wider uppercase gap-4">
          <p>© 2026 · PRASHANT SHRESTHA · ALL RIGHTS RESERVED</p>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="w-7 h-7 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            title="System Info"
          >
            <HelpCircle size={14} />
          </button>
        </div>

        {/* Modal Info if Help clicked */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-4 p-6 bg-zinc-950 border border-zinc-800 text-sm font-mono text-zinc-300 italic text-center shadow-2xl relative max-w-2xl mx-auto"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <p className="leading-relaxed">
                "There is no such thing as 'perfect' in this world..."
              </p>
              <p className="mt-4 text-[10px] text-red-500 font-bold uppercase not-italic tracking-[0.2em]">— Kurotsuchi Mayuri</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};
