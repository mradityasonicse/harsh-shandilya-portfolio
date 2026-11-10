import React from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { X, Printer, Download, Mail, Phone, MapPin, Code2, Globe, CheckCircle2, Shield, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PersonalProfile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#090e17] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 animate-scaleUp font-sans print:bg-white print:text-black print:border-none print:p-0 print:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header Bar (Excluded during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 uppercase">
              Curriculum Vitae
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Harsh Kumar Shandilaya • Official Resume
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/Harsh_Resume.pdf"
              download="Harsh_Kumar_Shandilaya_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0e1622] dark:hover:bg-[#141f2e] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold uppercase transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#05080c] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="space-y-6">
          {/* Header with Photo Avatar */}
          <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-200 dark:border-slate-800 print:border-black/20 pb-6 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#05080c] flex items-center justify-center">
                <img
                  src="/profile-photo.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/profile-photo.svg';
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-display font-medium text-[var(--text-primary)] print:text-black tracking-[-0.02em] mb-1">
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base font-sans font-medium text-[var(--text-primary)] print:text-neutral-800 uppercase tracking-normal">
                {profile.role}
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] print:text-neutral-600 mt-1">
                {profile.subRole}
              </p>

              {/* Coordinates / Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-xs font-mono text-[var(--text-muted)] print:text-neutral-700">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 print:text-black" />
                  {profile.location}
                </span>
                <span>•</span>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 text-[var(--text-primary)] hover:underline print:text-black font-semibold">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {profile.email}
                </a>
                {profile.phone && (
                  <>
                    <span>•</span>
                    <a href={`tel:${profile.phone}`} className="flex items-center gap-1 hover:text-[var(--text-primary)] print:text-black">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {profile.phone}
                    </a>
                  </>
                )}
                <span>•</span>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--text-primary)] print:text-black">
                  <Code2 className="w-3.5 h-3.5 text-slate-500" />
                  GitHub
                </a>
                <span>•</span>
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--text-primary)] print:text-black">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Profile / Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-2">
              Profile Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-neutral-800 font-sans leading-relaxed">
              {profile.aboutBio}
            </p>
          </div>

          {/* Work Experience / Student Leadership */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-3">
              Work Experience & Community Leadership
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.role} className="p-4 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 print:bg-neutral-50 border border-slate-200 dark:border-slate-800 print:border-neutral-200">
                  <div className="flex justify-between items-start text-xs sm:text-sm font-semibold text-slate-900 dark:text-white print:text-black">
                    <span className="text-slate-900 dark:text-sky-400 font-bold">{exp.role}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 print:text-neutral-800 text-xs">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 print:text-neutral-600 mb-2 font-medium">
                    {exp.organization} • {exp.location}
                  </div>
                  <div className="space-y-1">
                    {exp.achievements.map((ach) => (
                      <div key={ach} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 print:text-neutral-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-2">
              Education
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 print:bg-neutral-50 border border-slate-200 dark:border-slate-800 print:border-neutral-200">
                <div className="flex justify-between items-start text-xs sm:text-sm font-semibold text-slate-900 dark:text-white print:text-black">
                  <span>{profile.education.degree}</span>
                  <span className="font-mono text-slate-800 dark:text-sky-400 print:text-neutral-800 font-bold">{profile.education.period}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 print:text-neutral-600 mt-0.5">
                  {profile.education.institution} • <span className="text-slate-800 dark:text-slate-200 print:text-black font-semibold">{profile.education.grade}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 print:text-neutral-700 mt-1">
                  {profile.education.details}
                </p>
              </div>

              {profile.secondaryEducation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.secondaryEducation.map((sec) => (
                    <div key={sec.level} className="p-3 rounded-xl bg-slate-50 dark:bg-[#05080c]/40 print:bg-neutral-50 border border-slate-200 dark:border-slate-800 print:border-neutral-200 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white print:text-black">{sec.level}</div>
                      <div className="text-slate-600 dark:text-slate-400 print:text-neutral-600">{sec.school}</div>
                      <div className="text-slate-700 dark:text-sky-400 font-mono text-[11px] mt-0.5 font-semibold">{sec.period}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-2">
              Technical Skills & Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {profile.skills.map((cat) => (
                <div key={cat.category} className="p-3 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 print:bg-neutral-50 border border-slate-200 dark:border-slate-800 print:border-neutral-200">
                  <div className="font-bold text-slate-900 dark:text-sky-400 print:text-black mb-1.5">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 print:bg-neutral-200 print:text-black text-[11px] font-mono">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-3">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.projects.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 print:bg-neutral-50 border border-slate-200 dark:border-slate-800 print:border-neutral-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white print:text-black font-heading flex items-center justify-between">
                      <span>{p.title}</span>
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-slate-900 dark:text-sky-400 hover:underline inline-flex items-center gap-1 text-[11px] font-mono font-semibold">
                        Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-[11px] font-mono text-slate-700 dark:text-sky-400 print:text-neutral-800 mt-0.5">{p.metrics}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 print:text-neutral-700 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-200 dark:bg-[#05080c] text-[10px] font-mono text-slate-800 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-sky-400 print:text-neutral-900 uppercase tracking-wider mb-3">
              Verified Certificates & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {profile.achievements.map((ach) => (
                <a
                  key={ach.id}
                  href={ach.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#05080c]/60 dark:hover:bg-[#141f2e] print:bg-neutral-50 border border-slate-200 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-600 print:border-neutral-200 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-slate-700 dark:text-sky-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white print:text-black group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{ach.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 print:text-neutral-600 font-mono">{ach.issuer}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
